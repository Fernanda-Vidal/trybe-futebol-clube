import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpException from '../utils/HttpException';
import { decode } from '../utils/token';

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authorization = req.header('Authorization') as string;

  const auth = decode(authorization);
  console.log('mid', auth);
  if (!auth) throw new HttpException('Token must be a valid token', StatusCodes.UNAUTHORIZED);

  next();
}
