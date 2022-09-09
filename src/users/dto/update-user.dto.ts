import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsOptional()
  firstname: string;

  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsOptional()
  lastname: string;

  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsOptional()
  @IsEmail()
  email: string;
}
