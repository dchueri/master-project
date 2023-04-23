import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../../users/entities/user.entity';
import { IUser } from '../../users/users.interface';
import { UsersService } from '../../users/users.service';
import { IAuthService } from '../interfaces/auth-service.interface';
import { UserPayload } from '../models/UserPayload';
import { UserToken } from '../models/UserToken';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByUsername(username);
    if (user) {
      const isValidPassword = await this.comparePassword(
        password,
        user.password,
      );
      if (isValidPassword) {
        return {
          ...user,
          password: '***',
        };
      }
    }
    throw new Error('E-mail or password provided is incorrect.');
  }

  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  resetPassword(userId: string, email: string): boolean {
    return true;
  }

  validateEmail(email: string): boolean {
    return true;
  }

  login(user: IUser): UserToken {
    const payload: UserPayload = {
      sub: user.id,
      username: user.username,
    };

    const jwtToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    return {
      access_token: jwtToken,
    };
  }
}
