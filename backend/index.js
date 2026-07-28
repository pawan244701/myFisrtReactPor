import 'dotenv/config';
import express from 'express';
import { json } from 'express';
import cors from 'cors';
import { pool } from './config/database.js';
import { router } from './routes/allRoute.js';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

const app = express();
// helmet: a surity middleware that works by autom... configring and settign HTTP res header on the server
// to send to client preventing: XXS, MIME, ClickJacking liek attacks always used at the top of routes
app.use(helmet());
app.use(express.json());

const allowedOrigins = [process.env.MY_SITE_FRONTEND_URL];

// cors setuop to only my mysite
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
app.use(cors(corsOptions));

// rateLimit an exteranl package that helps us to track incomign reqs from client
// so that we genrally protect server to attacks like: brutefroce
const authLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // seting 10 minutes
    max: 10,                  // eact IP 10 attempts
    message: {
        status: 429,
        error: 'Too many Requests',
        message: 'Too many attempts! Please try again afert 10 minuts.'
    }
});
app.set('trust proxy', 1); // i'm usign render adn render works as proxy, so this line ignore the render's ip and restrict only user
app.use('/login', authLimiter);
app.use('/signup', authLimiter);

app.use('/', router);

const PORT = process.env.PORT || process.env.SERVER_PORT;
app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}!!!`)
});
