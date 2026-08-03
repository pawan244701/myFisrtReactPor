import 'dotenv/config';
import { pool } from '../config/database.js';

export const verifySignUpOtp = async (req, res) => {
    const { email, otpCode } = req.body;

    try {
        const [rows] = await pool.query(
            "SELECT * FROM pendingVerificationUsers WHERE email = ? AND otpCode = ?",
            [email, otpCode]
        );
        if (rows.length === 0) {
            return res.status(400).json({
                message: "Invalid Otp or email!"
            });
        }
        const pendingUser = rows[0];
        if (new Date() > new Date(pendingUser.expiresAt)) {
            return res.status(400).json({
                message: "Otp expired! Please Signup again."
            });
        }

        await pool.query(
            "INSERT INTO users (full_name, email, password) VALUES (?,?,?)",
            [pendingUser.full_name, pendingUser.email, pendingUser.password]
        );
        await pool.query(
            "DELETE FROM pendingVerificationUsers WHERE email = ?",
            [email]
        );
        return res.status(201).json({
            message: 'Email verified successfully!'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error. Please try again after a few minutes."
        });
    }
}