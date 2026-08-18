import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { router } from './routes/allRoute.js';
import helmet from 'helmet';
import { corsFuncAllowedOrigins } from './middlewares/corsMiddle.js';
import { ipLogger } from './middlewares/middleIpLogger.js';

const app = express();
app.set('trust proxy', 1);
// helmet: a surity middleware that works by autom... configring and settign HTTP res header on the server
// to send to client preventing: XXS, MIME, ClickJacking liek attacks always used at the top of routes
app.use(helmet());
app.use(express.json());

app.use(cors());
app.use(corsFuncAllowedOrigins);

// i'm usign render adn render works as proxy, so this line ignore the render's ip and restrict only user
app.use(ipLogger);
app.use('/', router);

const PORT = process.env.PORT || process.env.SERVER_PORT;
app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}!!!`)
});
