import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrito } from '../entities/Carrito.entity';
import { CarritoProducto } from '../entities/CarritoProducto.entity';
import { Producto } from '../entities/Producto.entity';
import { CarritoService } from './carrito.service';
import { CarritoController } from './carrito.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Carrito, CarritoProducto, Producto])
  ],
  controllers: [CarritoController],
  providers: [CarritoService],
  exports: [CarritoService],
})
export class CarritoModule {}
