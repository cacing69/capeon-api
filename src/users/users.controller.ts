import { setResponse, ResponseType } from './../utils/helpers/response-helper';
// eslint-disable-next-line prettier/prettier
import { CursorDto } from './../utils/dto/cursor.dto';
import { BaseResponse } from './../utils/base-response';

import { decodeId } from '../utils/helpers/helper';

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll(@Query() cursorDto: CursorDto) {
    const meta = cursorDto;

    const data = await this.userService.cursor(cursorDto);
    // return baseResponseList(data, { meta });
    return setResponse(ResponseType.List, data, { meta });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 201,
    description: 'user has been successfully created.',
    type: BaseResponse,
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return setResponse(
      ResponseType.Create,
      await this.userService.create(createUserDto),
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const decodedId = decodeId(id);
    return setResponse(
      ResponseType.Read,
      await this.userService.getById(decodedId),
    );
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const decodedId = decodeId(id);
    await this.userService.update(decodedId, updateUserDto);
    return setResponse(ResponseType.Update, null);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const decodedId = decodeId(id);
    await this.userService.remove(decodedId);
    return setResponse(ResponseType.Delete, null);
  }
}
