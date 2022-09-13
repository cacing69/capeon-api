import { AuthDto } from './auth.dto';
import { PickType } from '@nestjs/mapped-types';

export class LoginAuthDto extends PickType(AuthDto, [
  'email',
  'password',
] as const) {}
