import { cursorBuilder } from './../utils/helpers/query-helper';
import { decodeId, encodeId } from '../utils/helpers/helper';
import { CursorDto } from './../utils/dto/cursor.dto';
import { BadRequestException } from './../utils/exceptions/bad-request.exception';
import { ERROR } from './../utils/error-code';
import { AlreadyExistException } from '../utils/exceptions/already-exist.exception';
import { InternalServerErrorException } from '../utils/exceptions/internal-server-error.exception';
import {
  RecordNotFoundException,
  RecordNotFoundToDeleteException,
  RecordNotFoundToUpdateException,
} from '../utils/exceptions/not-found.exception';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.password != createUserDto.passwordConfirmation)
      throw new BadRequestException('password confirmation do not match');
    try {
      const salt = await bcrypt.genSaltSync(10);
      const hash = await bcrypt.hashSync(createUserDto.password, salt);

      const data = await this.userRepository.create({
        ...createUserDto,
        password: hash,
      });

      await this.userRepository.save(data);
      return data;
    } catch (error: any) {
      if (error?.code === ERROR.POSTGRES.UNIQUE_VALIDATION) {
        throw new AlreadyExistException('email');
      }
      throw new InternalServerErrorException(error);
    }
  }

  // async paginate(paginateDto: PaginateDto) {
  //   const data = await this.userRepository.find({
  //     order: {
  //       createdAt: 'DESC',
  //     },
  //     take: paginateDto.limit,
  //     skip: (paginateDto.page - 1) * paginateDto.limit,
  //     where: {
  //       // id: LessThan('58d2222e-0bba-48f9-a92c-5de9597ad464'),
  //     },
  //   });
  //   return data;
  // }

  async cursor(cursorDto: CursorDto) {
    const params = cursorBuilder(cursorDto);
    const data = await this.userRepository.find(params);

    return data;
  }

  async getById(id: number) {
    const data = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (data) {
      return data;
    }
    throw new RecordNotFoundException('user with this id does not exist');
  }

  async getByEmail(email: string) {
    const data = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (data) {
      return data;
    }
    throw new RecordNotFoundException('user with this email does not exist');
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updated = await this.userRepository.update(id, updateUserDto);

    if (updated) {
      return updated;
    }
    throw new RecordNotFoundToUpdateException();
  }

  async updatePassword(id: number, password: string) {
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);

    const updated = await this.userRepository.update(id, { password: hash });

    if (updated) {
      return updated;
    }

    throw new RecordNotFoundToUpdateException();
  }

  async remove(id: number) {
    const deleted = await this.userRepository.softDelete(id);
    if (!deleted.affected) {
      throw new RecordNotFoundToDeleteException();
    }

    return deleted;
  }
}
