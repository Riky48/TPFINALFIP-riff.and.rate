import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/Producto.entity';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { _user } from 'src/feed/entities/_user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producto, _user])],
  controllers: [ProductoController],
  providers: [ProductoService],
  exports: [ProductoService], // por si lo uso en otros módulos (Carrito, Pedido, etc.)
})
export class ProductoModule {}
