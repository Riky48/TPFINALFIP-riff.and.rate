import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { _profile } from '../database/entities/_profile.entity';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
import { _user } from '../database/entities/_user.entity';
import { _country } from '../database/entities/_country.entity';

@Injectable()
export class PerfilService {
  constructor(
    @InjectRepository(_profile)
    private perfilRepository: Repository<_profile>,
  ) { }

  async create(createDto: CreatePerfilDto): Promise<_profile> {
    const { id_user, country_id, ...rest } = createDto;

    // Buscar usuario
    const user = await this.perfilRepository.manager.findOne(_user, {
      where: { id: id_user },
    });

    if (!user) {
      throw new NotFoundException(`El usuario con id ${id_user} no existe`);
    }

    // Buscar country si se envió
    let country: _country | undefined = undefined;

    if (country_id) {
      const foundCountry = await this.perfilRepository.manager.findOne(_country, {
        where: { country_id },
      });
      if (foundCountry) country = foundCountry;
    }

    // Crear perfil 
    const perfil = this.perfilRepository.create({
      id_user,
      user,
      ...(country ? { country } : {}), // solo se agrega si existe
      ...rest,
    });

    return this.perfilRepository.save(perfil);
  }



  async findAll(): Promise<_profile[]> {
    return this.perfilRepository.find({ relations: ['country'] });
  }

  async findOne(id_user: number): Promise<_profile> {
    const perfil = await this.perfilRepository.findOne({
      where: { id_user },
      relations: ['country'],
    });

    if (!perfil) {
      throw new NotFoundException(`Perfil con id ${id_user} no encontrado`);
    }

    return perfil;
  }

  async update(id_user: number, updateDto: UpdatePerfilDto): Promise<_profile> {
    const perfil = await this.findOne(id_user); // Verifica existencia
    const updated = Object.assign(perfil, updateDto);
    return this.perfilRepository.save(updated);
  }

  async remove(id_user: number): Promise<void> {
    const perfil = await this.findOne(id_user); // Verifica existencia
    await this.perfilRepository.remove(perfil);
  }
}