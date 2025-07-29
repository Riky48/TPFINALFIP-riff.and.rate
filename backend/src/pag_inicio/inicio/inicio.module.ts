import { Module } from '@nestjs/common';
import { InicioService } from './inicio.service';
import { InicioController } from './inicio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { users } from './entities/inicio.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
    users
  ])],
  controllers: [InicioController],
  providers: [InicioService],
})
export class InicioModule {}
