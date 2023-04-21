import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import UserNotProvidedException from '../exceptions/user-not-provided';

@Injectable()
export class HeadersMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const user = req.header('user');
    if (user) {
      next();
    } else {
      throw new UserNotProvidedException();
    }
  }
}
