import { Expose } from "class-transformer";

export type BaseResponseOption = {
  code: string;
  message: string;
  meta?: object;
  extra?: string[];
};

// @UseInterceptors(ClassSerializerInterceptor)
export class BaseResponse {
  @Expose()
  code: string;

  @Expose()
  message: string;

  @Expose()
  data;

  @Expose()
  meta;

  @Expose()
  extra;

  constructor(dataResponse?: any, options?: BaseResponseOption) {
    this.code = options?.code || '20001';
    this.message = options?.message || 'success';
    this.data = dataResponse || null;
    this.meta = options?.meta || null;
    this.extra = options?.extra || null;
  }
}
