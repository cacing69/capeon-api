import { PaginateDto } from './../utils/dto/paginate.dto';
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
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

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

  async findAll(paginateDto: PaginateDto) {
    const data = await this.userRepository.find({
      order: {
        createdAt: 'DESC',
      },
      take: paginateDto.limit,
      skip: (paginateDto.page - 1) * paginateDto.limit,
      where: {
        // id: LessThan('58d2222e-0bba-48f9-a92c-5de9597ad464'),
      },
    });
    return data;
  }

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
    throw new RecordNotFoundException();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    const updated = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (updated) {
      return updated;
    }
    throw new RecordNotFoundToUpdateException();
  }

  async remove(id: string) {
    const deleted = await this.userRepository.delete(id);
    if (!deleted.affected) {
      throw new RecordNotFoundToDeleteException();
    }
  }
}
