// src/marketplace/entities/carrito.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  Column,
  CreateDateColumn,
} from 'typeorm';

import { CarritoProducto } from './CarritoProducto.entity';
import { _user } from 'src/database/entities/_user.entity';

@Entity('carrito')
export class Carrito {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => _user, (user) => user.carrito, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: _user;

  @OneToMany(() => CarritoProducto, (cp) => cp.carrito, { cascade: true, eager: true })
  productos: CarritoProducto[];

  @Column('decimal', { default: 0 })
  total: number;

  @CreateDateColumn()
  creado_el: Date;
}
