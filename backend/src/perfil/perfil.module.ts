import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { _profile } from '../database/entities/_profile.entity';
import { _country } from '../database/entities/_country.entity';
import { PerfilService } from './perfil.service';
import { PerfilController } from './perfil.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ _profile,_country])],
  providers: [PerfilService],
  controllers: [PerfilController],
})
export class PerfilModule {}