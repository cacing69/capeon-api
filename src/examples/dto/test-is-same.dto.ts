import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { User } from '@src/users/entities/user.entity';
import { IsUnique } from '@src/utils/decorators/is-unique.decorator';
import { IsIdentical } from '@src/utils/decorators/is-identical.decorator';
// import { IsSame } from '@src/utils/decorators/is-confirmed.decorator';

export class TestIsSameDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsDefined()
  @IsUnique(User)
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
  @IsIdentical('password')
  passwordConfirmation: string;
}
