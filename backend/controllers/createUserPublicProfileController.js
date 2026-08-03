import 'dotenv/config';
import { pool } from '../config/database.js';

export const createPublicProfile = async (req, res) => {

    const {
        username,
        bio = null,
        country = null,
        area = null,
        gender = null,
        dateOfBirth = null
    } = req.body;

    // getting auth user details provided by verifyToken middleware
    const userId = req.user?.userId;
    const name = req.user?.full_name;

    if (!userId) {
        return res.status(401).json({
            message: 'Unauthorized. Login again first!.'
        });
    }

    // required field check
    if (!username || username.trim() === '') {
        return res.status(400).json({
            message: 'Username is required to create a public profile.'
        });
    }

    try {
        await pool.query(
            `INSERT INTO userPublicProfile 
            (user_id, username, bio, country, area, gender, dateOfBirth) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [userId, username.trim(), bio, country, area, gender, dateOfBirth]
        );

        return res.status(201).json({
            message: `${name}, your public profile has been created!`,
            profile: {
                username: username.trim(), country, area
            }
        });

    } catch (error) {
        console.error('Profile Creating Error:', error);

        if (error.code === 'ER_DUP_ENTRY' || error.errno === 1062) {

            // Check if error message mentions: user_id or username
            if (error.sqlMessage && error.sqlMessage.includes('user_id')) {
                return res.status(400).json({
                    message: 'You already have a public profile!'
                });
            }

            return res.status(400).json({
                message: "Username already exists! Please try a different one."
            });
        }
        return res.status(500).json({
            message: 'Server error! Please try again after a few minutes.'
        });
    }
}