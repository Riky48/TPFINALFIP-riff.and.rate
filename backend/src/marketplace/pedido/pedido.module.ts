import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Pedido } from 'src/database/entities/Pedido.entity';
import { PedidoProducto } from 'src/database/entities/PedidoProducto.entity';
import { Carrito } from 'src/database/entities/Carrito.entity';
import { CarritoProducto } from 'src/database/entities/CarritoProducto.entity';


import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { _user } from 'src/database/entities/_user.entity';

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
