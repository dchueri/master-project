import { BadRequestException } from '@nestjs/common';

class InvalidAuthFieldException extends BadRequestException {
  constructor() {
    super(`Username or password provided is incorrect.`);
  }
}

export default InvalidAuthFieldException;
