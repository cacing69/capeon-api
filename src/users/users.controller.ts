import { BaseResponse } from './../utils/base-response';
import { PaginateDto } from './../utils/dto/paginate.dto';
import {
  baseResponseCreate,
  baseResponseDelete,
  baseResponseList,
  baseResponseRead,
  baseResponseUpdate,
} from './../utils/helpers';
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
import { classToPlain, plainToClass } from 'class-transformer';
import { User } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll(@Query() paginateDto: PaginateDto) {
    // console.log(query);
    const meta = paginateDto;

    const data = await this.userService.findAll(paginateDto);
    return baseResponseList(data, { meta });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 201,
    description: 'user has been successfully created.',
    type: BaseResponse,
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return baseResponseCreate(await this.userService.create(createUserDto));
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return baseResponseRead(await this.userService.getById(id));
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return baseResponseUpdate(await this.userService.update(id, updateUserDto));
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return baseResponseDelete(await this.userService.remove(id));
  }
}
