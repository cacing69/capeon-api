import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export type BaseResponseOption = {
  code: string;
  message: string;
  meta?: object;
  extra?: string[];
};

// @UseInterceptors(ClassSerializerInterceptor)
export class BaseResponse {
  @ApiProperty()
  @Expose()
  code: string;

  @ApiProperty()
  @Expose()
  message: string;

  @ApiProperty()
  @Expose()
  data: object | Array<object> = {};

  @ApiProperty()
  @Expose()
  meta: object = {};

  @ApiProperty()
  @Expose()
  extra: Array<string> = [];

  constructor(dataResponse?: any, options?: BaseResponseOption) {
    this.code = options?.code || '20001';
    this.message = options?.message || 'success';
    this.data = dataResponse || null;
    this.meta = options?.meta || null;
    this.extra = options?.extra || null;
  }
}
