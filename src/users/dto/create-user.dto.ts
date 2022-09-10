import { PartialType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class CreateUserDto extends PartialType(UserDto) {}
