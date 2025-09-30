import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { _user } from '../../feed/entities/_user.entity';
import { PedidoProducto } from './PedidoProducto.entity';
import { Pago } from './Pago.entity';
import { Factura } from './Factura.entity';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() =>_user, usuario => usuario.pedidos)
  usuario: _user; // vinculado al mail del usuario

  @OneToMany(() => PedidoProducto, pedidoProducto => pedidoProducto.pedido, { cascade: true })
  pedidoProductos: PedidoProducto[];

  @OneToOne(() => Pago, pago => pago.pedido, { cascade: true })
  @JoinColumn()
  pago: Pago;

  @CreateDateColumn()
  fechaCreacion: Date;

  @Column({ default: 'pendiente' })
  estado: string; // por ej. 'pendiente', 'pagado', 'enviado';

  @OneToOne(() => Factura, factura => factura.pedido, { cascade: true })
Factura: Factura;

}
