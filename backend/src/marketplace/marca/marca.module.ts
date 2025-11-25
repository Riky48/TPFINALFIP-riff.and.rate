import { Module } from '@nestjs/common';
import { MarcaService } from './marca.service';
import { MarcaController } from './marca.controller';
import { Marca } from 'src/database/entities/Marca.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Marca])],
    controllers: [MarcaController],
    providers: [MarcaService],
    exports: [MarcaService],
})
export class MarcaModule {}
