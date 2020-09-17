import { Test, TestingModule } from '@nestjs/testing';
import { ControController } from './contro.controller';

describe('ControController', () => {
  let controller: ControController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ControController],
    }).compile();

    controller = module.get<ControController>(ControController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
