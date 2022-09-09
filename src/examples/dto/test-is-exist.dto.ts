import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { IsExist } from 'src/utils/decorators/is-exist.decorator';
import { IsSame } from 'src/utils/decorators/is-same.decorator';
import { IsUnique } from 'src/utils/decorators/is-unique.decorator';

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
  @IsSame('firstname')
  firstnameConfirm: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  @IsEmail()
  @IsExist(User)
  email: string;
}
