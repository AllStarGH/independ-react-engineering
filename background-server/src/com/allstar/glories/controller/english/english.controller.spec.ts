import { Test, TestingModule } from '@nestjs/testing';
import { EnglishController } from './english.controller';

describe('EnglishController', () => {
  let controller: EnglishController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnglishController],
    }).compile();

    controller = module.get<EnglishController>(EnglishController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
