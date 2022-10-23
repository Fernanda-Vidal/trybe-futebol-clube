import {
  StatusCodes,
} from 'http-status-codes';
import HttpException from '../utils/HttpException';
import ILogin from '../interfaces';
import User from '../database/models/User';

export default class UserService {
  constructor(private model: typeof User = User) {
    this.login = this.login.bind(this);
  }

  async login({ email, password }: ILogin): Promise<any> {
    const user = await this.model.findOne({ where: { email, password } });

    if (!user) throw new HttpException('Incorrect email or password', StatusCodes.UNAUTHORIZED);
  }
}
