import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Producto } from './Producto.entity';
import { _user } from 'src/database/entities/_user.entity';


@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  puntuacion: number;

  @Column('text')
  comentario: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  // Relación con Producto
  @ManyToOne(() => Producto, producto => producto.reviews)
  producto: Producto;

  // Relación con usuario
  @ManyToOne(() => _user, user => user.reviews)
  user: _user;
}
