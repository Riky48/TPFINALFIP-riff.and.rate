import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Producto } from './Producto.entity';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  descripcion: string;

  // Relación bidireccional con Producto
  @ManyToMany(() => Producto, producto => producto.categorias)
  productos: Producto[];
}
