import 'dotenv/config';
import { pool } from '../config/database.js'; // don't forget to add extension: .js o/w you'll get: [Error [ERR_MODULE_NOT_FOUND]: Cannot find module]
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//don't forget async here o/w you'll get error: [SyntaxError: Unexpected reserved word]
export const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await pool.query(
            "SELECT * FROM users WHERE email = ? LIMIT 1",
            [email] // always pass the exect same incoming values to query o/w you'll get an error: 500 server error
        );
        if (rows.length === 0) {
            return res.status(401).json({
                message: "Invalid Email or Password"
            });
        }
        const userExists = rows[0];
        const isPasswordMatching = await bcrypt.compare(password, userExists.password);

        if (!isPasswordMatching) {
            return res.status(401).json({
                message: "Invalid Email or Password"
            });
        }

        const [publicAccCheck] = await pool.query(
            "SELECT * FROM userPublicProfile WHERE user_id = ? LIMIT 1",
            [userExists.id]
        );
        const username = publicAccCheck.length > 0 ? publicAccCheck[0].username : null;

        // creatinf jwt payload
        const payload = {
            userId: userExists.id,
            email: userExists.email,
            full_name: userExists.full_name,
            username: username
        };
        const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1d'});

        return res.status(200).json({
            message: "Login successful",
            token: token,
            full_name: userExists.full_name,
            username: username
        });

    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({
            message: "Login failed! Server error!"
        })
    }
}