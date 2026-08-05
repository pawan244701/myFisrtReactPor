import { pool } from "../config/database.js";

export const updatePublicProfile = async (req, res) => {
    const {
        bio, country, area, gender, dateOfBirth
    } = req.body;

    const userId = req.user?.userId;
    if (!userId) {
        return res.status(401).json({
            message: 'Unauthorized. Please login.'
        });
    }

    try {
        const [result] = await pool.query(`
            UPDATE userPublicProfile
            SET
                bio = COALESCE(?, bio),
                country = COALESCE(?, country),
                area = COALESCE(?, area)
            WHERE user_id = ?`,
            [
                bio ?? null,
                country ?? null,
                area ?? null, 
                userId
            ]);
            // check got updatead or not
            if (result.affectedRows === 0) {
                return res.status(440).json({
                    message: "No public profile found. Create one first!"
                });
            }

            return res.status(200).json({
                message: "Profile updated Successfully!"
            });
    } catch (error ) {
        console.error('Update Profile error: ', error);
        res.status(500).json({
            message: "Server error! Could not update profile."
        });
    }
}
