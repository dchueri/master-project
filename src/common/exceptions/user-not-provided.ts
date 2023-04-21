import { BadRequestException } from '@nestjs/common';

class UserNotProvidedException extends BadRequestException {
  constructor() {
    super(`User must be provided on request header`);
  }
}

export default UserNotProvidedException;
