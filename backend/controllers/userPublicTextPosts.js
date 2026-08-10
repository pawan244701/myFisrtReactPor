import 'dotenv/config';
import { pool } from '../config/database.js';

export const createPublicTextPosts = async (req, res) => {
    const userId = req.user?.userId;
    const { textPostContent } = req.body;

    if (!textPostContent || typeof textPostContent !== 'string' || textPostContent.trim() === '') {
        return res.status(400).json({
            message: 'Post content cannot be empty!'
        });
    }
    const trimmedContent = textPostContent.trim();

    if (trimmedContent.length > 1000) {
        return res.status(400).json({
            message: 'Post exceeds the maximum length of 1000 characters!'
        });
    }

    try {
        // check public profile is available or not
        const [profile] = await pool.query(
            'SELECT username FROM userPublicProfile WHERE user_id = ?',
            [userId]
        );
        if (profile.length === 0) {
            return res.status(403).json({
                message: "Create public profile first!"
            });
        }

        await pool.query(`
            INSERT INTO textPosts (user_id, content) VALUES (?,?)
            `, [userId, trimmedContent]
        );

        return res.status(201).json({
            message: "Post created successfully!"
        });

    } catch (error) {
        console.error("Error create post", error);
        return res.status(500).json({
            message: 'Server error! Failed to create post.'
        });
    }
};





export const getMyPublicTextPosts = async (req, res) => {
    const userId = req.user?.userId;
    // ROUTE 1: GET LOGGED-IN USER'S OWN POSTS
    try {
        const [posts] = await pool.query(
            `SELECT id, content, created_at 
            FROM textPosts 
            WHERE user_id = ? 
            ORDER BY created_at DESC`,
            [userId]
        );

        return res.status(200).json({
            count: posts.length,
            posts
        });
    } catch (error) {
        console.error("Error fetching user posts:", error);
        return res.status(500).json({
            message: "Server error! Unable to fetch your posts."
        });
    }
};





// GET ALL PUBLIC POSTS (FOR EVERYONE)
export const getAllPublicPosts = async (req, res) => {
    try {
        const [posts] = await pool.query(
            `SELECT 
                p.id AS postId,
                p.content,
                p.created_at AS createdAt,
                up.user_id AS userId,
                up.username,
                up.bio,
                up.country
            FROM textPosts p
            JOIN userPublicProfile up ON p.user_id = up.user_id
            ORDER BY p.created_at DESC`
        );

        return res.status(200).json({
            count: posts.length,
            posts
        });
    } catch (error) {
        console.error("Error fetching all public posts:", error);
        return res.status(500).json({
            message: "Server error! Unable to fetch feed."
        });
    }
};





export const getPostsByUsername = async (req, res) => {
    const { username } = req.params;

    try {
        const [posts] = await pool.query(
            `SELECT 
                p.id AS postId,
                p.content,
                p.created_at AS createdAt,
                up.user_id AS userId,
                up.username,
                up.bio,
                up.country
            FROM textPosts p
            JOIN userPublicProfile up ON p.user_id = up.user_id
            WHERE up.username = ?
            ORDER BY p.created_at DESC`,
            [username]
        );

        return res.status(200).json({
            count: posts.length,
            posts
        });
    } catch (error) {
        console.error("Error fetching user posts by username:", error);
        return res.status(500).json({
            message: "Server error! Unable to fetch user posts."
        });
    }
};