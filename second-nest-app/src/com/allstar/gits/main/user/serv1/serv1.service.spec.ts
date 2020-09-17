import { Test, TestingModule } from '@nestjs/testing';
import { Serv1Service } from './serv1.service';

describe('Serv1Service', () => {
  let service: Serv1Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Serv1Service],
    }).compile();

    service = module.get<Serv1Service>(Serv1Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
