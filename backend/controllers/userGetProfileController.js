import { pool } from '../config/database.js';

export const getPublicProfile = async (req, res) => {
    const { username } = req.params;

    try {
        const [row] = await pool.query(`
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


export const getMyProfile = async (req, res) => {
    const userId = req.user?.userId;

    try {
        const [rows] = await pool.query(
            `SELECT p.username, p.bio, p.country, p.area, p.gender, p.dateOfBirth 
             FROM userPublicProfile p
             WHERE p.user_id = ? LIMIT 1`,
            [userId]
        );

        if (rows.length === 0) {
            return res.status(200).json({
                isVisible: false,
                message: "No profile created yet."
            });
        }

        return res.status(200).json({
            isVisible: true,
            profile: rows[0]
        });
    } catch (error) {
        // console.error("Get My Profile Error:", error);
        return res.status(500).json({
            message: "Server error checking profile."
        });
    }
};



export const getAllPublicProfiles = async (req, res) => {
    try {
        const [ allUsers ] = await pool.query(`
            SELECT u.full_name, p.username, p.bio, p.country, p.area, p.gender, p.dateOfBirth, p.created_at 
            FROM userPublicProfile p
            JOIN users u ON p.user_id = u.id 
            ORDER BY p.created_at DESC
            `);
            return res.status(200).json({
                profiles: allUsers
            });
    } catch (error) {
        console.error("erro from fetching all profiles: ", error);
        return this.status(500).json({
            message: "Server errors could not fetch profiles!"
        });
    }
}
