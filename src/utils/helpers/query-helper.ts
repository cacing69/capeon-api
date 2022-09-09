import { decodeId } from './helper';
import { FindManyOptions, LessThan, Like } from 'typeorm';
import { CursorDto } from './../dto/cursor.dto';

type CursorOption = {
  where?: any;
};

export const cursorBuilder = (
  cursorDto: CursorDto,
  cursorOtions?: CursorOption,
) => {
  console.log(cursorDto.filter);

  let where = {};
  if (cursorDto.lastId) {
    where = {
      id: LessThan(decodeId(cursorDto.lastId)),
    };
  }

  Object.entries(cursorDto?.filter)?.forEach(([key, value]) => {
    where[key] = Like(`%${value}%`);
  });

  const options: FindManyOptions = {
    take: cursorDto.limit,
    where,
    order: {
      id: 'DESC',
    },
  };

  return options;
};
