import { IsIdentical } from '../../core/decorator/is-identical.decorator';
import { Trim } from 'class-sanitizer';
// import { IsIdentical } from '../../core/decorator/is-identical.decorator';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

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
  @IsIdentical('password')
  passwordConfirmation: string;
}
