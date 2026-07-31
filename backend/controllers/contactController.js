import 'dotenv/config';
import { pool } from '../config/database.js';
import { BrevoClient } from '@getbrevo/brevo';

export const userMessage = async (req, res) => {
    const { message } = req.body;
    
    const senderEmail = req.user.email;
    const userId = req.user.userId;
    const username = req.user.username;

    const userMSG = new BrevoClient({
        apiKey: process.env.BREVO_API_KEY
    });

    try {
        const [ serviceUsed ] = await pool.query(
            `SELECT * FROM emailServiceUsed 
            WHERE email = ? AND DATE(created_at) = CURDATE() 
            LIMIT 1`, 
            [senderEmail]
        );
        if (serviceUsed.length > 0) {
            return res.status(403).json({
                message: "Your daily limit is exhausted! Try again tomorrow."
            });
        }

        await userMSG.transactionalEmails.sendTransacEmail({
            subject: `Portfolio msg: From: ${username}`,
            textContent: `User: ${username} (${senderEmail})\nMessage: \n${message}`,
            sender: { 
                "name": username, 
                "email": process.env.MY_EMAIL 
            },
            replyTo: {email: senderEmail },
            to: [{ "email": process.env.MY_EMAIL }]
        });

        await pool.query(
            `INSERT INTO emailServiceUsed (username, email)
             VALUES (?, ?)`,
            [ username, senderEmail ]
        );

        return res.status(200).json({
            message: 'Email send successfully'
        });
    } catch (error) {
        console.error('contactController error : ', error);

        return res.status(500).json({
            message: 'Failed to send message. Server error!'
        });
    }
}
