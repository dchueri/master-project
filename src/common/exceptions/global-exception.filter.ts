import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { EntityPropertyNotFoundError, QueryFailedError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(error: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = 500;
    let message: string | object = 'Internal server error';

    if (error instanceof HttpException) {
      status = error.getStatus();
      const res = error.getResponse() as any;
      message = res.message;
    }
    if (error instanceof QueryFailedError) {
      if (error.driverError.code === '23503') {
        status = 404;
        message = `User with username '${error.parameters.at(-1)}' not found`;
      }
      if (error.driverError.code === '22P02') {
        status = 400;
        message = error.driverError.message;
      }
    }
    if (error instanceof EntityPropertyNotFoundError) {
      status = 400;
      message = error.message;
    }

    response.status(status).json({
      statusCode: status,
      message: message,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
    });
  }
}
