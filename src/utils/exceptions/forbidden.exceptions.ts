import { codeMapping } from '../code-mapping';
import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor() {
    super(
      {
        code: codeMapping.FORBIDDEN.FORBIDDEN_GENERAL,
        message: 'forbidden',
        data: null,
        meta: null,
        extra: null,
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
