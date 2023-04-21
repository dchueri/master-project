import { NotFoundException } from '@nestjs/common';

class UserNotFoundException extends NotFoundException {
  constructor(username: string) {
    super(`User with username ${username} not found`);
  }
}

export default UserNotFoundException;
