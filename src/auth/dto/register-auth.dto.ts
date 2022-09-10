import { PartialType } from '@nestjs/swagger';
import { AuthDto } from './auth.dto';

export class RegisterAuthDto extends PartialType(AuthDto) {}
