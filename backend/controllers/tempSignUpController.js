import 'dotenv/config';
import { pool } from '../config/database.js';
import bcrypt from 'bcrypt';
import { BrevoClient } from '@getbrevo/brevo';

export const tempUserSignup = async (req, res) => {
    const { username, email, password } = req.body;

    const otpclient = new BrevoClient({
        apiKey: process.env.BREVO_API_KEY
    });
    try {
        // checking if already exists in usres tbl
        const [rows] = await pool.query(
            "SELECT * FROM users WHERE email = ? LIMIT 1",
            [email]
        );
        if (rows.length > 0) {
            return res.status(400).json({
                message: 'User Exists! Try Login with password'
            });
        }

        const [isOtpInTempTable] = await pool.query(
            "SELECT * FROM pendingVerificationUsers WHERE email = ? AND expiresAt > NOW()",
            [email]
        );
        if (isOtpInTempTable.length > 0) {
            return res.status(400).json({
                success: false,
                message: "OTP is already sended, check your email or try after 5 minutes!"
            });
        }

        // otp gen
        const genOtp = Math.floor(1000000 + Math.random() * 9000000).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        // password incryption
        const saltRound = 8;
        const hashedPassword = await bcrypt.hash(password, saltRound);

        //saving data in DB table named: pendingVerificationUsers
        await pool.query(
            `INSERT INTO pendingVerificationUsers (username, email, password, otpCode, expiresAt)
                 VALUES (?, ?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE 
                    username = VALUES(username),
                    password = VALUES(password),
                    otpCode = VALUES(otpCode),
                    expiresAt = VALUES(expiresAt)`,
            [username, email, hashedPassword, genOtp, expiresAt] // this is expiresAt is not defined
        );

        // send otp email 
        await otpclient.transactionalEmails.sendTransacEmail({
            subject: 'Otp to verify your Email',
            textContent: `This is your OTP: ${genOtp}. \nIt is valid only for 5 minites.`,
            sender: { "name": "pawan244701", "email": process.env.MY_EMAIL },
            to: [{ "email": email }]
        });

        // checking for valid otp
        return res.status(200).json({
            message: 'Otp send to your email! Check your email app.'
        });

    } catch (err) {
        console.error('erro === : ', err);
        if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
            return res.status(400).json({
                success: false,
                message: 'Email already Exists! try diffrent one or login with current one.'
            });
        }
        console.error("Signup error details:", err);
        return res.status(500).json({
            message: 'Signup failed! Server error!'
        });
    }
}
