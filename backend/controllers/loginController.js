import 'dotenv/config';
import { pool } from '../config/database.js'; // don't forget to add extension: .js o/w you'll get: [Error [ERR_MODULE_NOT_FOUND]: Cannot find module]
import bcrypt from 'bcrypt';

//don't forget async here o/w you'll get error: [SyntaxError: Unexpected reserved word]
export const userLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await pool.query(
            "SELECT * FROM users WHERE username = ? LIMIT 1",
            [username] // always pass the exect same incoming values to query o/w you'll get an error: 500 server error
        );
        if (rows.length === 0) {
            return res.status(401).json({
                message: "Invalid Username or Password"
            });
        }
        const userExists = rows[0];
        const isPasswordMatching = await bcrypt.compare(password, userExists.password);
        if (!isPasswordMatching) {
            return res.status(401).json({
                message: "Invalid Username or Password"
            });
        }
        return res.status(200).json({
            message: "Login successful"
        })
    } catch (err) {
        //console.error("Login Error:", err);
        return res.status(500).json({
            message: "Login failed! Server error!"
        })
    }
}