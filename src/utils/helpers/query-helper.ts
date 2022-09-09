import { decodeId } from './helper';
import { LessThan } from 'typeorm';
import { CursorDto } from './../dto/cursor.dto';
export const cursorBuilder = (cursorDto: CursorDto) => {
  let where = {};

  if (cursorDto.lastId) {
    where = {
      id: LessThan(decodeId(cursorDto.lastId)),
    };
  }

  return {
    where,
  };
};
