import express from 'express';
import { validateEmail, registerUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/validateemail', validateEmail);

userRouter.post('/register', registerUser);

export default userRouter;
