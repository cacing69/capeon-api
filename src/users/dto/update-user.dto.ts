import { UserDto } from './user.dto';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto extends PickType(UserDto, [
  'firstname',
  'lastname',
] as const) {
  @ApiProperty()
  @IsDefined()
  @IsOptional()
  @IsEmail()
  email: string;
}
