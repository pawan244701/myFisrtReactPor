import express from 'express';
import { userSignup } from '../controllers/signUpController.js'; // don't forget to add extansion .js otherwise you'll get: Error [ERR_MODULE_NOT_FOUND]: Cannot find module
import { userLogin } from '../controllers/loginController.js'; // don't forget to import otherwise you'll get: Error [ReferenceError: userLogin is not defined]

export const router = express.Router();

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.post('/login', userLogin);
// router.post('/contact', userMessage);
