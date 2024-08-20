import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const actualDate = new Date();
    const date = actualDate.toLocaleDateString();
    const time = actualDate.toLocaleTimeString();
    const method = req.method;
    const url = req.url;
    const ip = req.ip;
    console.log(`[${date} - ${time}]${method} ${url} - IP ${ip}`);
    next();
  }
}

export function LoggerGlobalMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(
    `Ejecutando Middleware Global: método ${req.method} en la ruta ${req.url}`,
  );
  next();
}
