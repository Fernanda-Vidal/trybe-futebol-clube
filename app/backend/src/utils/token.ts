import jwt = require('jsonwebtoken');
import { Secret, SignOptions, JwtPayload } from 'jsonwebtoken';
import dotenv = require('dotenv');
import { IUser } from '../interfaces';

dotenv.config();

const TOKEN_SECRET = process.env.JWT_SECRET;

const encode = (payload: any) => {
  const jwtConfig = {
    expiresIn: '15m',
    algorithm: 'HS256',
  };

  const token = jwt.sign(payload, TOKEN_SECRET as Secret, jwtConfig as SignOptions);
  return token;
};

const decode = (token: string) => {
  try {
    const validate = jwt.verify(token, TOKEN_SECRET as Secret) as IUser;
    return validate.role;
  } catch (error) {
    return false;
  }
};

export { encode, decode };
