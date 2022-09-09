import { PickType } from '@nestjs/swagger';
import { TestIsExistDto } from './test-is-exist.dto';

export class TestPickTypeDto extends PickType(TestIsExistDto, [
  'number',
] as const) {}
