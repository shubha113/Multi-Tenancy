import express from 'express';
import { getUserProfile, loginUser, logoutUser } from '../controllers/authController.js';
import {isAuthenticated} from '../middlewares/auth.js'

const router = express.Router();

//Login route
router.post('/login', loginUser);
//Logout route
router.post('/logout', logoutUser);
//Get Profile route
router.get('/me', isAuthenticated, getUserProfile);

export default router;