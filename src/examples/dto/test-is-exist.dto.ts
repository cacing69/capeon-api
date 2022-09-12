import { ApiProperty } from '@nestjs/swagger';
import { IsIdentical } from '../../../src/core/decorator/is-identical.decorator';
import { IsUnique } from '../../../src/core/decorator/is-unique.decorator';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { IsExist } from '../../../src/core/decorator/is-exist.decorator';

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
