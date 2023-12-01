import express from 'express';
import {
  validateEmail,
  registerUser,
  loginUser,
  getUserProfile,
  authenticateToken,
} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/validateemail', validateEmail);

userRouter.post('/register', registerUser);

userRouter.post('/login', loginUser);

userRouter.post('/getprofile', authenticateToken, getUserProfile);

export default userRouter;
