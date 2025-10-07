import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from '../entities/Producto.entity';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  // POST - Crear producto
  async create(data: Partial<Producto>): Promise<Producto> {
    const producto = this.productoRepository.create(data);
    return await this.productoRepository.save(producto);
  }

  // GET - Listar todos
  async findAll(): Promise<Producto[]> {
    return await this.productoRepository.find({
      relations: ['marca', 'categorias', 'reviews'],
    });
  }

  // GET - Buscar por ID
  async findOne(id: number): Promise<Producto> {
    const producto = await this.productoRepository.findOne({
      where: { id },
      relations: ['marca', 'categorias', 'reviews'],
    });

    if (!producto) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }

    return producto;
  }
}
