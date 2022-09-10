import { User } from 'src/users/entities/user.entity';
import { cursorBuilder } from './../utils/helpers/query-helper';
import { CursorDto } from './../utils/dto/cursor.dto';
import { BadRequestException } from './../utils/exceptions/bad-request.exception';
import {
  RecordNotFoundException,
  RecordNotFoundToUpdateException,
} from '../utils/exceptions/not-found.exception';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto, actor?: User) {
    if (createUserDto.password != createUserDto.passwordConfirmation)
      throw new BadRequestException('password confirmation do not match');

    try {
      const salt = await bcrypt.genSaltSync(10);
      const hash = await bcrypt.hashSync(createUserDto.password, salt);

      const data = await this.userRepository.create({
        ...createUserDto,
        ...{
          createdBy: actor?.id,
        },
        password: hash,
      });

      await this.userRepository.save(data);
      return data;
    } catch (error: any) {
      throw new BadRequestException(error);
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

  async update(id: number, updateUserDto: UpdateUserDto, actor?: User) {
    try {
      const updated = await this.userRepository.update(id, {
        ...updateUserDto,
        ...{
          updatedBy: actor.id,
        },
      });

      if (updated.affected) {
        return updated;
      }
    } catch (error: any) {
      throw new BadRequestException(error);
    }
    throw new RecordNotFoundToUpdateException();
  }

  async updatePassword(id: number, password: string, actor?: User) {
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);

    const updated = await this.userRepository.update(id, {
      password: hash,
      ...{
        updatedBy: actor?.id,
      },
    });

    if (updated.affected) {
      return updated;
    }

    throw new RecordNotFoundToUpdateException();
  }

  async updateLastLoginAt(user, actor?: User) {
    const updated = await this.userRepository.update(user.id, {
      ...{
        updatedBy: actor?.id,
        lastLoginAt: new Date(),
      },
    });

    if (updated.affected) {
      return updated;
    }

    throw new RecordNotFoundToUpdateException();
  }

  async delete(id: number, actor?: User) {
    try {
      const deleted = await this.userRepository.update(id, {
        deletedAt: new Date(),
        ...{
          deletedBy: actor.id,
        },
      });

      if (deleted.affected) {
        return deleted;
      }
    } catch (error: any) {
      throw new BadRequestException(error);
    }

    throw new RecordNotFoundToUpdateException();
  }
}
