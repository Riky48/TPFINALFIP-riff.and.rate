import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from 'src/database/entities/Producto.entity';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { _user } from 'src/database/entities/_user.entity';
import { Categoria } from 'src/database/entities/Categoria.entity';
import { Marca } from 'src/database/entities/Marca.entity';
import { Factura } from 'src/database/entities/Factura.entity';
import { Carrito } from 'src/database/entities/Carrito.entity';
import { CarritoProducto } from 'src/database/entities/CarritoProducto.entity';
import { Review } from 'src/database/entities/Review.entity';
import { PostProducto } from 'src/database/entities/PostProducto.entity';
import { PedidoProducto } from 'src/database/entities/PedidoProducto.entity';
import { Pedido } from 'src/database/entities/Pedido.entity';
import { Pago } from 'src/database/entities/Pago.entity';
import { CategoriaModule } from './categoria/categoria.module';
import { MarcaModule } from './marca/marca.module';
import { CarritoModule } from './carrito/carrito.module';
import { PedidoModule } from './pedido/pedido.module';


@Module({
  imports: [TypeOrmModule.forFeature([Producto, _user, Categoria, Marca, Factura,Carrito,CarritoProducto, 
    Review,PostProducto,PedidoProducto,Pedido,Pago]), CategoriaModule, MarcaModule, CarritoModule, PedidoModule],
  

controllers: [ProductoController],
  providers: [ProductoService],
  exports: [ProductoService], // por si lo uso en otros módulos (Carrito, Pedido, etc.)
})
export class ProductoModule {}
