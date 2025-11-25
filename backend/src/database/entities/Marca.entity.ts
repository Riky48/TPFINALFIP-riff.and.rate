import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Producto } from './Producto.entity';

@Entity()
export class Marca {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  descripcion: string;

  // Relación: Una marca tiene muchos productos
  @OneToMany(() => Producto, producto => producto.marca)
  productos: Producto[];
}
