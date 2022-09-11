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
import { IsConfirmed } from '@src/utils/decorators/is-confirmed.decorator';
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
  @IsConfirmed('password')
  passwordConfirmation: string;
}
