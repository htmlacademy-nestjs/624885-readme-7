import { AxiosError } from 'axios';
import { Response } from 'express';

import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';

const INTERNAL_SERVER_MESSAGE = 'Internal server error';

@Catch(AxiosError)
export class AxiosExceptionFilter implements ExceptionFilter {
  catch(exception: AxiosError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.response?.statusText || INTERNAL_SERVER_MESSAGE;

    response.status(status)
      .json({
        statusCode: status,
        message
      });
  }
}
