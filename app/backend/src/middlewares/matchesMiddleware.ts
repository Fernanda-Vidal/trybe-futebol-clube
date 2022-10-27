import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpException from '../utils/HttpException';

export default function matchesMiddleware(req: Request, _res: Response, next: NextFunction) {
  const { homeTeam, awayTeam /* , homeTeamGoals, awayTeamGoals */ } = req.body;

  console.log('entrei middleware');
  const message = 'It is not possible to create a match with two equal teams';
  if (parseInt(homeTeam, 10) === parseInt(awayTeam, 10)) {
    throw new HttpException(message, StatusCodes.UNPROCESSABLE_ENTITY);
  }
  next();
}
