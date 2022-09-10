import { ApiProperty } from '@nestjs/swagger';
import { Trim } from 'class-sanitizer';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Trim()
  firstname: string;

  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsOptional()
  @Trim()
  lastname: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  @Trim()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @MinLength(6)
  passwordConfirmation: string;
}
