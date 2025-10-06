import { Module } from '@nestjs/common';
import { PerfilService } from './perfil.service';
import { PerfilController } from './perfil.controller';

@Module({
  providers: [PerfilService],
  controllers: [PerfilController]
})
export class PerfilModule {}
