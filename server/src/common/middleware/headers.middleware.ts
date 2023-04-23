import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import UserNotProvidedException from '../exceptions/user-not-provided.exception';

@Injectable()
export class HeadersMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const headerUser = req.header('user');
    const token = req.header('authorization').replace('Bearer ', '');
    const loggedUser: any = this.jwtService.decode(token);
    if (headerUser === loggedUser.username) {
      next();
    } else {
      throw new UserNotProvidedException();
    }
  }
}
