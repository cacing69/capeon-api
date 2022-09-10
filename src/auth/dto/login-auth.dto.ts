import { AuthDto } from './auth.dto';
import { PickType } from '@nestjs/swagger';

export class LoginAuthDto extends PickType(AuthDto, [
  'email',
  'password',
] as const) {}
