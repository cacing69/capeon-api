import { PartialType } from '@nestjs/mapped-types';
import { AuthDto } from './auth.dto';

export class RegisterAuthDto extends PartialType(AuthDto) {}
