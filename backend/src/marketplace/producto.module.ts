import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/Producto.entity';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Producto])],
  controllers: [ProductoController],
  providers: [ProductoService],
  exports: [ProductoService], // por si lo uso en otros módulos (Carrito, Pedido, etc.)
})
export class ProductoModule {}
