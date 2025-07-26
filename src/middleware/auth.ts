import { NextFunction, Request, Response } from 'express';

const API_KEY = process.env.API_KEY;

export function authorized(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers['apikey'];  

  if (apiKey !== API_KEY) {
    return res.status(401).json({ status: 401, message: 'Invalid api key' });
  }

  next();
}