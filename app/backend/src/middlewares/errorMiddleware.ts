import { ErrorRequestHandler as Erro } from 'express';
import HttpException from '../utils/HttpException';

const errorMidleware: Erro = (err, req, res, next) => {
  const { status, message } = err as HttpException;

  res.status(status || 500).json({ message });

  next();
};

export default errorMidleware;
