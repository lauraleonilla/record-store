import express from 'express';
import { validateEmail, registerUser, loginUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/validateemail', validateEmail);

userRouter.post('/register', registerUser);

userRouter.post('/login', loginUser);

export default userRouter;
