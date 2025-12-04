import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { _profile } from '../database/entities/_profile.entity';
import { _user } from '../database/entities/_user.entity';
import { _country } from '../database/entities/_country.entity';
import { _musician_profile } from '../database/entities/_musician_profile.entity';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
import { CreateMusicianProfileDto } from './dto/create-musician-profile.dto';

@Injectable()
export class PerfilService {
  constructor(
    @InjectRepository(_profile)
    private perfilRepository: Repository<_profile>,

    @InjectRepository(_musician_profile)
    private musicianRepository: Repository<_musician_profile>,
  ) {}

  // ---------------- PERFIL PERSONAL ----------------
  async create(createDto: CreatePerfilDto): Promise<_profile> {
    const { id, country_id, ...rest } = createDto;

    const user = await this.perfilRepository.manager.findOne(_user, {
      where: { id: id },
    });
    if (!user) {
      throw new NotFoundException(`El usuario con id ${id} no existe`);
    }

    let country: _country | undefined = undefined;
    if (country_id) {
      const foundCountry = await this.perfilRepository.manager.findOne(_country, {
        where: { country_id },
      });
      if (foundCountry) country = foundCountry;
    }

    const perfil = this.perfilRepository.create({
      id,
      user,
      ...(country ? { country } : {}),
      ...rest,
    });

    return this.perfilRepository.save(perfil);
  }

  async findAll(): Promise<_profile[]> {
    return this.perfilRepository.find({ relations: ['country'] });
  }

  async findOne(id: number): Promise<_profile> {
    const perfil = await this.perfilRepository.findOne({
      where: { id },
      relations: ['country'],
    });

    if (!perfil) {
      throw new NotFoundException(`Perfil con id ${id} no encontrado`);
    }

    return perfil;
  }

  async update(id: number, updateDto: UpdatePerfilDto): Promise<_profile> {
    const perfil = await this.findOne(id);
    const updated = Object.assign(perfil, updateDto);
    return this.perfilRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const perfil = await this.findOne(id);
    await this.perfilRepository.remove(perfil);
  }

  // ---------------- PERFIL MUSICAL ----------------

  async saveMusicianProfile(id: number, dto: CreateMusicianProfileDto): Promise<_musician_profile> {
  const user = await this.perfilRepository.manager.findOne(_user, {
    where: { id }
  });

  if (!user) throw new NotFoundException(`Usuario con id ${id} no existe`);

  // Ahora buscamos POR user.id, no por id del perfil musical
  const existing = await this.musicianRepository.findOne({
    where: { user: { id } },
    relations: ['user'],
  });

  if (existing) {
    Object.assign(existing, dto);
    return this.musicianRepository.save(existing);
  }

  const profile = this.musicianRepository.create({
    user,
    ...dto
  });

  return this.musicianRepository.save(profile);
}

async getMusicianProfile(id: number) {
  const profile = await this.musicianRepository.findOne({
    where: { user: { id } },
    relations: ['user'],
  });

  if (!profile) {
    return {
      genres: '',
      instrument: '',
      experience_years: 0,
      skill_level: '',
      influences: '',
      projects: '',
      availability: '',
      music_link: '',
      equipment: '',
    };
  }

  return profile;
}


  async updateMusicianProfile(id: number, dto: CreateMusicianProfileDto): Promise<_musician_profile> {
    const profile = await this.musicianRepository.findOne({ where: { id } });
    if (!profile) throw new NotFoundException(`Perfil musical con id ${id} no encontrado`);

    Object.assign(profile, dto);
    return this.musicianRepository.save(profile);
  }

  async removeMusicianProfile(id: number): Promise<void> {
    const profile = await this.musicianRepository.findOne({ where: { id } });
    if (!profile) throw new NotFoundException(`Perfil musical con id ${id} no encontrado`);

    await this.musicianRepository.remove(profile);
  }
}
