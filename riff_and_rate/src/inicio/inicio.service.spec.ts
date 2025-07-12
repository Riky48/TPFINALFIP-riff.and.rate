import { Test, TestingModule } from '@nestjs/testing';
import { InicioService } from './inicio.service';

describe('InicioService', () => {
  let service: InicioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InicioService],
    }).compile();

    service = module.get<InicioService>(InicioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
