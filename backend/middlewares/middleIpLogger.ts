import { pool } from '../config/database.js';
import { Response, Request, NextFunction } from 'express';

export const ipLogger = async (req: Request, _res: Response, next: NextFunction) => {

    if (req.url === '/favicon.ico') {
        return next();
    }
    try {
        const visitorIp = req.ip || req.socket.remoteAddress || '0.0.0.0';
        const visited_at = new Date();
        const visited_path = req.url;

        // console.log(`[${visited_at}] ${visited_path} - IP: ${visitorIp}`);
        // store in db
        await pool.query(
            `INSERT INTO visitor_logs (visited_at, ip_address, endpoint) 
       VALUES (?, ?, ?)`,
            [visited_at, visitorIp, visited_path]
        );
        console.log("data asved in DB successfully");
    } catch (error) {
        console.error("ipLogger error:", error);
    } finally {
        next();
    }
};
