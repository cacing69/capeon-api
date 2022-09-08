import { CursorDto } from './../dto/cursor.dto';
export const cursorBuilder = (cursorDto: CursorDto) => {
  return {
    where: {
      id: 1,
    },
  };
};
