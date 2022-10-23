import { Router } from 'express';
import loginMiddleware from '../middlewares/loginMiddleware';
import UserController from '../controllers/UserController';
import UserService from '../services/UserService';

const userService = new UserService();
const userController = new UserController(userService);
const router = Router();

router.post('/login', loginMiddleware, userController.login);

export default router;
