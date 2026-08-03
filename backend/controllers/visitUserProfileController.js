import { pool } from '../config/database.js';

export const getPublicProfile = async (req, res) => {
    const { username } = req.params;

    try {
        const[row] = await pool.query(`
            SELECT u.full_name, p.username, p.bio, p.country, p.area, p.gender, p.dateOfBirth, p.created_at 
            FROM userPublicProfile p
            JOIN users u ON p.user_id = u.id 
            WHERE p.username = ? LIMIT 1
            `,
            [username]
        );
        if (row.length === 0) {
            return res.status(404).json({
                message: "User or Public profile not found!"
            });
        }
        return res.status(200).json({
            profile: row[0]
        });
    } catch (error) {
        console.error("Get profile error : ", error);
        return res.status(500).json({
            message: 'Server error! Could not retrive profile.'
        });
    }
}