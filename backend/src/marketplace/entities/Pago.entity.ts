import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Pedido } from './Pedido.entity';

@Entity()
export class Pago {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  monto: number; // total a pagar

  @Column()
  metodo: string; // por ejemplo: 'tarjeta', 'debito', 'mercado pago'

  @Column({ default: 'pendiente' })
  estado: string; // 'pendiente', 'aprobado', 'rechazado'

  @OneToOne(() => Pedido, pedido => pedido.pago)
  pedido: Pedido;
}
