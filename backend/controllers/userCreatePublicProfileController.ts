import 'dotenv/config';
import { pool } from '../config/database.js';
import { Response, Request } from 'express';

interface MySqlError extends Error {
    code?: string;
    errno?: number;
    sqlMessage?: string;
}
export const createPublicProfile = async (req: Request, res: Response) => {

    // null was not working because FR is sending empty stritg, that's not undefined there is something
    // and DB can't store empty strign into date it needs null or exect formated date so it gave me err 192 

    const {
        username,
        bio,
        country,
        area,
        gender,
        dateOfBirth
    } = req.body;

    // this is to convert empty or only-space string to null 
    // doing this because got error HAHAHAHHAHAH
    const normalizeValue = (val: string) => {
        if (typeof val === 'string') {
            const trimmed = val.trim();
            return trimmed === '' ? null : trimmed;
        }
        return val ?? null;
    }

    // getting auth user details provided by verifyToken middleware
    const userId = req.user?.userId;
    const name = req.user?.full_name;

    if (!userId) {
        return res.status(401).json({
            message: 'Unauthorized. Login again first!.' // got this error msg now while creatign public acc time
        });
    }

    // 1. Check if username is present
    const trimmedUsername = typeof username === 'string' ? username.trim() : '';

    // required field check
    if (!trimmedUsername) {
        return res.status(400).json({
            message: 'Username is required to create a public profile.'
        });
    }
    if (trimmedUsername.length < 3) {
        return res.status(400).json({
            message: "Username must be at least 3 chars"
        })
    } 

    // filter to reject specail chars
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(trimmedUsername)) {
        return res.status(400).json({
            message: 'Username can only contain letters, numbers, and underscores (_). No spaces, @, or # allowed!'
        });
    }

    // normalizign option fields
    const cleanedBio = normalizeValue(bio);
    const cleanedCountry = normalizeValue(country);
    const cleanedArea = normalizeValue(area);
    const cleanedGender = normalizeValue(gender);
    const cleanedDoB = normalizeValue(dateOfBirth);

    try {
        await pool.query(
            `INSERT INTO userPublicProfile 
            (user_id, username, bio, country, area, gender, dateOfBirth) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                userId,
                trimmedUsername,
                cleanedBio,
                cleanedCountry,
                cleanedArea,
                cleanedGender,
                cleanedDoB
            ]);

        return res.status(201).json({
            message: `${name}, your public profile has been created!`,
            profile: {
                username: trimmedUsername,
                country: cleanedCountry,
                area: cleanedArea
            }
        });

    } catch (err) {
        const error = err as MySqlError;
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
