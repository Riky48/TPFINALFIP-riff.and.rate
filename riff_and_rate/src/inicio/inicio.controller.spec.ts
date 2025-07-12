import { Test, TestingModule } from '@nestjs/testing';
import { InicioController } from './inicio.controller';
import { InicioService } from './inicio.service';

describe('InicioController', () => {
  let controller: InicioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InicioController],
      providers: [InicioService],
    }).compile();

    controller = module.get<InicioController>(InicioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
