import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpException from '../utils/HttpException';
import UserService from '../services/UserService';

export default class UserController {
  constructor(private userService: UserService = new UserService()) {
    this.login = this.login.bind(this);
    this.authenticate = this.authenticate.bind(this);
  }

  async login(req: Request, res: Response): Promise<Response> {
    const authorization = await this.userService.login(req.body);
    return res.status(200).json({ token: authorization });
  }

  async authenticate(req: Request, res: Response): Promise<Response> {
    const authorization = req.header('Authorization') as string;
    const user = await this.userService.authenticate(authorization);

    if (!user) throw new HttpException('Invalid Token', StatusCodes.UNAUTHORIZED);
    return res.status(200).json({ role: user });
  }
}
