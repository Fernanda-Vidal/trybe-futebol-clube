import { NextFunction, Request, Response } from 'express';
import {
  StatusCodes,
} from 'http-status-codes';
import HttpException from '../utils/HttpException';

const isValidEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export default function loginMiddleware(req: Request, _res: Response, next: NextFunction) {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new HttpException('All fields must be filled', StatusCodes.BAD_REQUEST);
  }

  if (!isValidEmail) {
    throw new HttpException('Incorrect email or password', StatusCodes.UNAUTHORIZED);
  }

  next();
}
