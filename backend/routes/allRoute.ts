import express from 'express';
import { authLimiter } from '../middlewares/rateLimiter.js';

import { validate } from '../middlewares/validateMiddle.js';
import { signupSchema, loginSchema, verifyOtpSchema } from '../schema/userSchema.js';

import { verifyToken } from '../middlewares/jwtAuthMiddle.js';

import { tempUserSignup } from '../controllers/tempSignUpController.js'; // don't forget to add extansion .js otherwise you'll get: Error [ERR_MODULE_NOT_FOUND]: Cannot find module
import { verifySignUpOtp } from '../controllers/verifySignUpOtpController.js';
import { userLogin } from '../controllers/loginController.js'; // don't forget to import otherwise you'll get: Error [ReferenceError: userLogin is not defined]
import { userMessage } from '../controllers/contactController.js'
import { createPublicProfile } from '../controllers/userCreatePublicProfileController.js'; // don't forget to type keyword: 'from'
import { updatePublicProfile } from '../controllers/userUpdatePublicProfileController.js';
import { getMyProfile, getPublicProfile, getAllPublicProfiles } from '../controllers/userGetProfileController.js';
import { createPublicTextPosts, getMyPublicTextPosts, getAllPublicPosts, getPostsByUsername } from '../controllers/userPublicTextPosts.js';
export const router = express.Router();

router.post('/signup', authLimiter, validate(signupSchema), tempUserSignup);
router.post('/verify-otp', authLimiter, validate(verifyOtpSchema), verifySignUpOtp);
router.post('/login', authLimiter, validate(loginSchema), userLogin);
router.post('/contact', authLimiter, verifyToken, userMessage);
router.post('/public-profile', verifyToken, createPublicProfile);
router.put('/public-profile', verifyToken, updatePublicProfile);
router.get('/me', verifyToken, getMyProfile);
router.get('/allProfiles', getAllPublicProfiles);
router.post('/posts', verifyToken, createPublicTextPosts);
router.get('/me/posts', verifyToken, getMyPublicTextPosts);
router.get('/feed', getAllPublicPosts);

router.get('/posts/user/:username', getPostsByUsername);
router.get('/:username', getPublicProfile);
