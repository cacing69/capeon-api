import { ApiProperty } from '@nestjs/swagger';
import { IsIdentical } from '../../core/decorators/is-identical.decorator';
import { IsUnique } from '../../core/decorators/is-unique.decorator';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { IsExist } from '../../core/decorators/is-exist.decorator';

export class TestIsExistDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  number: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @IsUnique(User)
  firstname: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @IsIdentical('firstname')
  firstnameConfirm: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  @IsEmail()
  @IsExist(User)
  email: string;
}
