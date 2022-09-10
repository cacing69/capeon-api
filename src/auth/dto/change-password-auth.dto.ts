import { PickType } from '@nestjs/swagger';
import { AuthDto } from './auth.dto';

export class ChangePasswordAuthDto extends PickType(AuthDto, [
  'password',
  'passwordConfirmation',
] as const) {}
