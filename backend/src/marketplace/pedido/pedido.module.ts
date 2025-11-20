import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Pedido } from '../entities/Pedido.entity';
import { PedidoProducto } from '../entities/PedidoProducto.entity';
import { Carrito } from '../entities/Carrito.entity';
import { CarritoProducto } from '../entities/CarritoProducto.entity';
import { _user } from 'src/feed/entities/_user.entity';

import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pedido,
      PedidoProducto,
      Carrito,
      CarritoProducto,
      _user,
    ]),
  ],
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}
