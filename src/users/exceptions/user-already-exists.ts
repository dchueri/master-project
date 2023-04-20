import { BadRequestException } from '@nestjs/common';

class UserAlreadyExistsException extends BadRequestException {
  constructor(userName: string) {
    super(`Username ${userName} already exists`);
  }
}

export default UserAlreadyExistsException;
