import {
  StatusCodes,
} from 'http-status-codes';
import bcrypt = require ('bcryptjs');
import HttpException from '../utils/HttpException';
import { ILogin } from '../interfaces';
import User from '../database/models/User';
import { decode, encode } from '../utils/token';

export default class UserService {
  constructor(private model: typeof User = User) {
    this.login = this.login.bind(this);
  }

  async login({ email, password }: ILogin): Promise<string> {
    const user = await this.model.findOne({ where: { email } });

    // consulta: https://jasonwatmore.com/post/2020/07/20/nodejs-hash-and-verify-passwords-with-bcrypt
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new HttpException('Incorrect email or password', StatusCodes.UNAUTHORIZED);
    }

    const { username, id, role } = user;
    return encode({ username, id, role });
  }

  authenticate = async (authorization: string) => {
    const user = decode(authorization);
    return user;
  };
}
