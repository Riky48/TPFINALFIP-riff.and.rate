import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Carrito } from './Carrito.entity';
import { Producto } from './Producto.entity';

@Entity()
export class CarritoProducto {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Carrito, carrito => carrito.productos)
  carrito: Carrito;

  @ManyToOne(() => Producto, producto => producto.carritoProductos)
  producto: Producto;

  @Column()
  cantidad: number;
}
