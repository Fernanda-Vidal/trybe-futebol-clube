import { Router } from 'express';
import loginMiddleware from '../middlewares/loginMiddleware';
import UserController from '../controllers/UserController';
import UserService from '../services/UserService';
import authMiddleware from '../middlewares/authMiddleware';

const userService = new UserService();
const userController = new UserController(userService);
const userRoute = Router();

userRoute.post('/', loginMiddleware, userController.login);
userRoute.get('/validate', authMiddleware, userController.authenticate);

export default userRoute;
