import { Router } from 'express';
import loginMiddleware from '../middlewares/loginMiddleware';
import UserController from '../controllers/UserController';
import UserService from '../services/UserService';

const userService = new UserService();
const userController = new UserController(userService);
const userRoute = Router();

userRoute.post('/login', loginMiddleware, userController.login);
userRoute.get('/login/validate', userController.authenticate);

export default userRoute;
