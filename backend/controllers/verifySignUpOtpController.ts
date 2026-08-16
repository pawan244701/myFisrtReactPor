import 'dotenv/config';
import { Response, Request } from 'express';
import { pool } from '../config/database.js';
import jwt from 'jsonwebtoken';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export const verifySignUpOtp = async (req: Request, res: Response) => {
    const { email, otpCode } = req.body;

    try {
        const [rows] = await pool.query<RowDataPacket[]>(
            "SELECT * FROM pendingVerificationUsers WHERE email = ? AND otpCode = ?",
            [email, otpCode]
        );

        const pendingUser = rows[0];
        if (!pendingUser) {
            return res.status(400).json({
                message: "Invalid Otp or email!"
            });
        }
        if (new Date() > new Date(pendingUser.expiresAt)) {
            return res.status(400).json({
                message: "Otp expired! Please Signup again."
            });
        }

        const [result] = await pool.query<ResultSetHeader>(
            "INSERT INTO users (full_name, email, password) VALUES (?,?,?)",
            [pendingUser.full_name, pendingUser.email, pendingUser.password]
        );
        await pool.query(
            "DELETE FROM pendingVerificationUsers WHERE email = ?",
            [email]
        );
        // creating jwt payload
        const payload = {
            userId: result.insertId,
            email: pendingUser.email,
            full_name: pendingUser.full_name
        };
        const token = jwt.sign(payload, process.env.JWT_KEY as string, { expiresIn: '1d' });

        return res.status(201).json({
            message: 'Email verified successfully!',
            token: token,
            full_name: pendingUser.full_name
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error. Please try again after a few minutes."
        });
    }
}
