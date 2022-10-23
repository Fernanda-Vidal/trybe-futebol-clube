import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  constructor(private userService: UserService = new UserService()) {
    this.login = this.login.bind(this);
  }

  async login(req: Request, res: Response): Promise<Response | void> {
    const serv = await this.userService.login(req.body);
    return res.status(200).json({ message: serv });
  }
}
