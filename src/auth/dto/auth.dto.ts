import { Trim } from 'class-sanitizer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { IsSame } from '../../../src/utils/decorators/is-same.decorator';

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  @Trim()
  firstname: string;

  @IsString()
  @IsOptional()
  @Trim()
  lastname?: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Trim()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @IsSame('password')
  passwordConfirmation: string;
}
