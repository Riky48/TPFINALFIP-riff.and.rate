import { Test, TestingModule } from '@nestjs/testing';
import { ProductoService } from './producto.service';
import { Producto } from './entities/Producto.entity';

describe('ProductoService', () => {
  let service: ProductoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductoService],
    }).compile();

    service = module.get<ProductoService>(ProductoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
