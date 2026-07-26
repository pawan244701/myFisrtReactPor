import express from 'express';
import { userSignup } from '../controllers/signUpController.js'; // don't forget to add extansion .js otherwise you'll get: Error [ERR_MODULE_NOT_FOUND]: Cannot find module

export const router = express.Router();

router.post('/signup', userSignup);
