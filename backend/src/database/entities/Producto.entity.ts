import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany, OneToOne } from 'typeorm';
import { Categoria } from './Categoria.entity';
import { Marca } from './Marca.entity'; 
import { Review } from './Review.entity';
import { PostProducto } from './PostProducto.entity';
import { PedidoProducto } from './PedidoProducto.entity'; // <-- entidad intermedia
import { CarritoProducto } from './CarritoProducto.entity';
import { _user } from 'src/database/entities/_user.entity';

@Entity(`producto`)
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column('text')
  descripcion: string;

  @Column('decimal')
  precio: number;

  @Column()
  stock: number;

   @Column({ nullable: true })
  img?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaPublicacion: Date;

  @ManyToOne(() => _user, (user) => user.productos, { nullable: true })
  user?: _user;

  @ManyToMany(() => Categoria, categoria => categoria.productos)
  @JoinTable()
  categorias: Categoria[];

  @ManyToOne(() => Marca, marca => marca.productos, { nullable: true })
  marca: Marca;


  @OneToMany(() => Review, review => review.producto)
  reviews: Review[];

  @OneToOne(() => PostProducto, post => post.producto)
  post: PostProducto;

  // relación con pedidos a través de la tabla intermedia PedidoProducto
  @OneToMany(() => PedidoProducto, pedidoProducto => pedidoProducto.producto)
  pedidoProductos: PedidoProducto[];

  @OneToMany(() => CarritoProducto, carritoProducto => carritoProducto.producto)
carritoProductos: CarritoProducto[];

}
