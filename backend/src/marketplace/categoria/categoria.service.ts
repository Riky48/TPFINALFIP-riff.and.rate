import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from '../entities/Categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepo: Repository<Categoria>,
  ) {}

  create(createCategoriaDto: CreateCategoriaDto) {
    const nueva = this.categoriaRepo.create(createCategoriaDto);
    return this.categoriaRepo.save(nueva);
  }

  findAll(): Promise <Categoria[]> {
    return this.categoriaRepo.find();
  }

  async findOne(id: number) {
    const categoria = await this.categoriaRepo.findOne({ where: { id }});
    if (!categoria) {
      throw new NotFoundException(`Categoria con id ${id} no encontrado`);
    }
    return categoria;
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    await this.findOne(id);
    await this.categoriaRepo.update(id, updateCategoriaDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.categoriaRepo.delete({ id });
  }
}
