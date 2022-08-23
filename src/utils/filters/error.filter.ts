import {
  Catch,
  HttpException,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class ErrorFilter extends BaseExceptionFilter {
  catch(error: any, host: ArgumentsHost) {
    const changeCode = (code) => {
      const defineCode = {
        400: '40000',
        401: '40100',
        404: '40400',
        500: '50000',
      };

      if (code in defineCode) return defineCode[code];

      return code;
    };

    const response = host.switchToHttp().getResponse();
    const status =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    console.debug(error);

    const getCode = error?.response?.statusCode || error?.response?.code || 500;
    const code = changeCode(getCode);
    const message =
      (error?.response?.message as string)?.toLowerCase() ||
      'something went wrong';
    const extra =
      error?.response?.extra || [error.stack?.split('at')[0]?.trim()] || null;
    const meta = null;
    const data = null;

    message;

    return response.status(status).send({ code, message, meta, data, extra });

    // return super.catch(error, host);
  }
}
