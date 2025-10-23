import { Test, TestingModule } from '@nestjs/testing';
import { MarcaController } from './marca.controller';
import { MarcaService } from './marca.service';

describe('MarcaController', () => {
  let controller: MarcaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarcaController],
      providers: [MarcaService],
    }).compile();

    controller = module.get<MarcaController>(MarcaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
