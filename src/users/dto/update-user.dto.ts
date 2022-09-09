import { CreateUserDto } from './create-user.dto';
import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';
import { AuditDto } from 'src/utils/dto/audit.dto';
import { IsDefined, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto extends PickType(CreateUserDto, [
  'firstname',
  'lastname',
] as const) {
  @ApiProperty()
  @IsDefined()
  @IsOptional()
  @IsEmail()
  email: string;
}
