import 'dotenv/config';
import express from 'express';
import { json } from 'express';
import cors from 'cors';

import { pool } from './config/database.js';
import { router } from './routes/allRoute.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/', router);



const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}!!!`)
});
