import { PickType } from '@nestjs/mapped-types';
import { AuthDto } from './auth.dto';

export class ChangePasswordAuthDto extends PickType(AuthDto, [
  'password',
  'passwordConfirmation',
] as const) {}
