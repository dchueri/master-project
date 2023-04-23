import { Request } from 'express';
import { IUser } from '../../users/users.interface';

export interface AuthRequest extends Request {
  user: IUser;
}
