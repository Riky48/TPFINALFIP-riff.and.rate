import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Producto } from './Producto.entity';

@Entity()
export class PostProducto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column('text')
  descripcion: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaPublicacion: Date;

  // Relación 1:1 con Producto
  @OneToOne(() => Producto, producto => producto.post)
  @JoinColumn()
  producto: Producto;
}
