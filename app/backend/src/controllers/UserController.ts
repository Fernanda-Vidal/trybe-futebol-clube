import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpException from '../utils/HttpException';
import { IUserService } from '../interfaces';

export default class UserController {
  constructor(private userService: IUserService) {
    this.login = this.login.bind(this);
    this.authenticate = this.authenticate.bind(this);
  }

  async login(req: Request, res: Response): Promise<Response> {
    const authorization = await this.userService.login(req.body);
    return res.status(200).json({ token: authorization });
  }

  authenticate = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.user) throw new HttpException('Invalid Token', StatusCodes.UNAUTHORIZED);
    return res.status(200).json({ role: req.body.user.role });
  };
}
