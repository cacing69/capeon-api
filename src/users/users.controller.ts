import { setResponse, ResponseType } from './../utils/helpers/response-helper';
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
  Req,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Authenticated } from 'src/utils/decorators/authenticated.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async index(@Query() cursorDto: CursorDto) {
    const meta = cursorDto;

    const data = await this.userService.cursor(cursorDto);

    return setResponse(ResponseType.List, data, { meta });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 201,
    description: 'user has been successfully created.',
    type: BaseResponse,
  })
  async create(@Req() request, @Body() createUserDto: CreateUserDto) {
    // await this.userService.setAuth(request);
    await this.userService.create(createUserDto, {
      createdBy: request?.user?.id,
    });
    return setResponse(ResponseType.Create, null);
  }

  @Get(':id')
  async detail(@Param('id') id: string) {
    const decodedId = decodeId(id);
    return setResponse(
      ResponseType.Read,
      await this.userService.getById(decodedId),
    );
  }

  @Patch(':id')
  async update(
    @Req() request,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const decodedId = decodeId(id);

    // await this.userService.setAuth(request);
    await this.userService.update(decodedId, updateUserDto, {
      updatedBy: request?.user?.id,
    });
    return setResponse(ResponseType.Update, null);
  }

  @Delete(':id')
  @Authenticated
  async delete(@Req() request, @Param('id') id: string) {
    const decodedId = decodeId(id);

    // await this.userService.setAuth(request);
    await this.userService.delete(decodedId, { deletedBy: request?.user?.id });
    return setResponse(ResponseType.Delete, null);
  }
}
