import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Pedido } from './Pedido.entity';


@Entity()
export class Factura {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Pedido)
  @JoinColumn()
  pedido: Pedido;  // relación con el pedido

  @Column()
  usuarioId: number; // para enviar la factura por mail

  @Column('decimal')
  total: number;     // total del pedido

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaEmision: Date;

  @Column()
  estado: string; // ej: 'pendiente', 'pagada', 'enviada'
}
