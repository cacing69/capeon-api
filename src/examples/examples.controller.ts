import { baseResponse } from './../utils/helpers/response-helper';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ExamplesService } from './examples.service';
import { TestIsSameDto } from './dto/test-is-same.dto';
import { TestIsExistDto } from './dto/test-is-exist.dto';
import { TestPickTypeDto } from './dto/test-pick-type.dto';
// import { testGeneric } from 'src/utils/helpers/helper';
@Controller('examples')
export class ExamplesController {
  constructor(private readonly examplesService: ExamplesService) {}

  @Post('test-is-match')
  testIsMatch(@Body() testIsMatchDto: TestIsSameDto) {
    return baseResponse(null);
  }

  @Post('test-is-exist')
  testIsExist(@Body() testIsExistDto: TestIsExistDto) {
    return baseResponse(null);
  }

  @Post('test-pick-type')
  testPickType(@Body() testPickTypeDto: TestPickTypeDto) {
    return baseResponse(null);
  }
  @Get('test-generic')
  testGeneric() {
    // const data = testGeneric<string>('data');
    // return baseResponse(data);
  }
}
