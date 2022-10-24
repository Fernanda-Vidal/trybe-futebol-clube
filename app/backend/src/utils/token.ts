import jwt = require('jsonwebtoken');
import { Secret, SignOptions } from 'jsonwebtoken';
import dotenv = require('dotenv');

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

export default encode;
