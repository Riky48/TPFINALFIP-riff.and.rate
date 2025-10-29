// src/perfil/perfil.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Perfil } from './entitys/perfil.entity';
import { Country } from './entitys/country.entity';
import { PerfilService } from './perfil.service';
import { PerfilController } from './perfil.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Perfil, Country])],
  providers: [PerfilService],
  controllers: [PerfilController],
})
export class PerfilModule {}