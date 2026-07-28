import 'dotenv/config';
import { pool } from '../config/database.js';
import bcrypt from 'bcrypt';

export const userSignup = async (req, res) => {
    const { username, email, password } = req.body; // obj destructuring, keys should match with data coming from browser

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please provide all details"
        })
    }
    try {
        const [rows] = await pool.query(
            "SELECT * FROM users WHERE username = ? OR email = ? LIMIT 1",
            [username, email] // don't forget to add both username and email otherwise you'll get: syntex err
            // LIMIT 1 : tells mysql to stop after getting first match
            // ? (parameterized query): prevents sql njection
            // [username] : must match obj
        );
        if (rows.length > 0) {
            return res.status(400).json({
                message: 'Username or Email Exists! Try diffrent one'
            });
        }

        // password incryption
        const saltRound = 8;
        const hashedPassword = await bcrypt.hash(password, saltRound);

        //saving data in DB table named: users
        const [row] = await pool.query(
            "INSERT INTO users (username, email, password) VALUES (?,?,?)",
            [username, email, hashedPassword]
        );
        return res.status(201).json({
            message: 'SignUp successfull!'
        });
    } catch (err) {
        // catching MySQL err and handle to prevent node server from crash
        if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
            return res.status(400).json({
                success: false,
                message: 'Username or Email already taken! try diffrent one!'
            });
        }
        //console.error("Signup error details:", err);
        return res.status(500).json({
            message: 'Signup failed! Server error!'
        });
    }
}
