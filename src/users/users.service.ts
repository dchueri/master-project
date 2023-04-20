import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import UserAlreadyExistsException from './exceptions/user-already-exists';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(name: string, username: string, password: string) {
    const hashPassword = await this.hashPassword(password);
    const user = this.usersRepository.create({
      name,
      username,
      password: hashPassword,
    });
    try {
      return await this.usersRepository.save(user);
    } catch {
      throw new UserAlreadyExistsException(username);
    }
  }

  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
}
