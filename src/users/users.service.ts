// import { User } from './../../src/users/entities/user.entity';
import { cursorBuilder, paginateBuilder } from '../core/helpers/query-helper';
import { CursorDto } from '../core/dtos/cursor.dto';
import { BadRequestException } from './../core/exceptions/bad-request.exception';
import {
  RecordNotFoundException,
  RecordNotFoundToUpdateException,
} from '../core/exceptions/not-found.exception';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import bcrypt = require('bcrypt');
import { User } from './entities/user.entity';
import { PaginateDto } from '../core/dtos/paginate.dto';
// import { AuthUserProvider } from '../core/providers/auth-user.provider';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // private readonly authUserProvider: AuthUserProvider,
  ) {}

  // private get user(): User {
  //   return this.authUserProvider.user;
  // }

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

  async paginate(paginateDto: PaginateDto) {
    // create paginate builder
    const params = paginateBuilder(paginateDto);
    const data = await this.userRepository.find(params);
    return data;
  }

  // async cursor(cursorDto: CursorDto) {
  //   const params = cursorBuilder(cursorDto);
  //   const data = await this.userRepository.find(params);

  //   return data;
  // }

  async getById(id: string) {
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

  async update(id: string, updateUserDto: UpdateUserDto, actor?: User) {
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

  async updatePassword(id: string, password: string, actor?: User) {
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

  async delete(id: string, actor?: User) {
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
