// src/perfil/perfil.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Perfil } from './entitys/perfil.entity';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { UpdatePerfilDto } from './dto/update-perfil.dto';

@Injectable()
export class PerfilService {
  constructor(
    @InjectRepository(Perfil)
    private perfilRepository: Repository<Perfil>,
  ) {}

  async create(createDto: CreatePerfilDto): Promise<Perfil> {
    const perfil = this.perfilRepository.create(createDto);
    return this.perfilRepository.save(perfil);
  }

  async findAll(): Promise<Perfil[]> {
    return this.perfilRepository.find({ relations: ['country'] });
  }

  async findOne(id_user: number): Promise<Perfil> {
    const perfil = await this.perfilRepository.findOne({
      where: { id_user },
      relations: ['country'],
    });

    if (!perfil) {
      throw new NotFoundException(`Perfil con id ${id_user} no encontrado`);
    }

    return perfil;
  }

  async update(id_user: number, updateDto: UpdatePerfilDto): Promise<Perfil> {
    const perfil = await this.findOne(id_user); // Verifica existencia
    const updated = Object.assign(perfil, updateDto);
    return this.perfilRepository.save(updated);
  }

  async remove(id_user: number): Promise<void> {
    const perfil = await this.findOne(id_user); // Verifica existencia
    await this.perfilRepository.remove(perfil);
  }
}