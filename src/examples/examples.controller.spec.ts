import { Test, TestingModule } from '@nestjs/testing';
import { ExamplesController } from './examples.controller';
import { ExamplesService } from './examples.service';

describe('ExamplesController', () => {
  let controller: ExamplesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamplesController],
      providers: [ExamplesService],
    }).compile();

    controller = module.get<ExamplesController>(ExamplesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
