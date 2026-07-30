import express from 'express';
import { authLimiter } from '../middlewares/rateLimiter.js';

import { tempUserSignup } from '../controllers/tempSignUpController.js'; // don't forget to add extansion .js otherwise you'll get: Error [ERR_MODULE_NOT_FOUND]: Cannot find module
import { verifySignUpOtp } from '../controllers/verifySignUpOtpController.js';
import { userLogin } from '../controllers/loginController.js'; // don't forget to import otherwise you'll get: Error [ReferenceError: userLogin is not defined]

export const router = express.Router();

router.post('/signup', authLimiter, tempUserSignup);
router.post('/verify-otp', authLimiter, verifySignUpOtp);
router.post('/login', authLimiter, userLogin);
// router.post('/contact',authLimiter, userMessage);
