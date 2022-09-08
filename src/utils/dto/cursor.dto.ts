import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CursorDto {
  @IsString()
  @IsOptional()
  lastId;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  limit = 10;
}
