import { User } from '../../users/entities/user.entity';

export interface IAuthService {
  validateUser(email: string, password: string): Promise<User | null>;

  resetPassword(userId: string, email: string): boolean;

  validateEmail(email: string): boolean;
}
