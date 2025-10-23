import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/Producto.entity';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { _user } from 'src/feed/entities/_user.entity';
import { Categoria } from './entities/Categoria.entity';
import { Marca } from './entities/Marca.entity';
import { Factura } from './entities/Factura.entity';
import { Carrito } from './entities/Carrito.entity';
import { CarritoProducto } from './entities/CarritoProducto.entity';
import { Review } from './entities/Review.entity';
import { PostProducto } from './entities/PostProducto.entity';
import { PedidoProducto } from './entities/PedidoProducto.entity';
import { Pedido } from './entities/Pedido.entity';
import { Pago } from './entities/Pago.entity';
import { CategoriaModule } from './categoria/categoria.module';
import { MarcaModule } from './marca/marca.module';


@Module({
  imports: [TypeOrmModule.forFeature([Producto, _user, Categoria, Marca, Factura,Carrito,CarritoProducto, 
    Review,PostProducto,PedidoProducto,Pedido,Pago]), CategoriaModule, MarcaModule],
  

controllers: [ProductoController],
  providers: [ProductoService],
  exports: [ProductoService], // por si lo uso en otros módulos (Carrito, Pedido, etc.)
})
export class ProductoModule {}
