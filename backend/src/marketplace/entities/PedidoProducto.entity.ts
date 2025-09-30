import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from 'typeorm';
import { Pedido } from './Pedido.entity';
import { Producto } from './Producto.entity';

@Entity()
export class PedidoProducto {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pedido, pedido => pedido.pedidoProductos)
  pedido: Pedido;

  @ManyToOne(() => Producto, producto => producto.pedidoProductos)
  producto: Producto;

  @Column()
  cantidad: number;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @CreateDateColumn()
  createdAt: Date;
}
