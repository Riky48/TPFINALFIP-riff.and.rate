import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Marca } from 'src/database/entities/Marca.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MarcaService {
  constructor(
    @InjectRepository(Marca)
    private marcaRepo: Repository<Marca>,
  ) {}

  create(createMarcaDto: CreateMarcaDto) {
    const nueva = this.marcaRepo.create(createMarcaDto);
    return this.marcaRepo.save(nueva);
  }

  findAll(): Promise <Marca[]> {
    return this.marcaRepo.find();
  }

  async findOne(id: number) {
    const marca = await this.marcaRepo.findOne({ where: { id }});
    if (!marca) {
      throw new NotFoundException(`Marca con id ${id} no encontrado`);
    }
    return marca;
  }

  async update(id: number, updateMarcaDto: UpdateMarcaDto) {
    await this.findOne(id);
    await this.marcaRepo.update(id, updateMarcaDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.marcaRepo.delete({ id });
  }
}
