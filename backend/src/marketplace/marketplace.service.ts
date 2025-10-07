import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/Producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class MarketplaceService {
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
  ) {}

  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    const producto = this.productoRepository.create(createProductoDto);
    return this.productoRepository.save(producto);
  }

  async findAll(): Promise<Producto[]> {
    return this.productoRepository.find({
      relations: ['marca', 'categorias', 'reviews'],
    });
  }

  async findOne(id: number): Promise<Producto | null> {
    return this.productoRepository.findOne({
      where: { id },
      relations: ['marca', 'categorias', 'reviews'],
    });
  }

  async update(id: number, updateProductoDto: UpdateProductoDto): Promise<Producto | null> {
    await this.productoRepository.update(id, updateProductoDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.productoRepository.delete(id);
  }
}
