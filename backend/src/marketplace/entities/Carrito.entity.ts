import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, Column } from 'typeorm';
import { _user } from '../../feed/entities/_user.entity';
import { CarritoProducto } from './CarritoProducto.entity';

@Entity()
export class Carrito {
  @PrimaryGeneratedColumn()
  id: number;

  // Relación con el usuario
  @ManyToOne(() => _user, user => user.carrito)
  user: _user;

  // Relación con productos a través de tabla intermedia
  @OneToMany(() => CarritoProducto, carritoProducto => carritoProducto.carrito, { cascade: true })
  productos: CarritoProducto[];

  @Column('decimal', { default: 0 })
  total: number;

  // Fecha de creación automática
  @CreateDateColumn()
  fechaCreacion: Date;
}
