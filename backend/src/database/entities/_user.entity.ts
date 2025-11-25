import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { _profile } from "./_profile.entity";
import { Producto } from "./Producto.entity";
import { Pedido } from "./Pedido.entity";
import { Review } from "./Review.entity";
import { Carrito } from "./Carrito.entity";

@Entity('_user')
export class _user {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name_: string;

    @Column()
    last_name: string;

    @Column()
    email: string;

    @Column({name: 'password_'})
    password: string;

    @Column()
    is_admin: boolean;

    @Column({name: 'code_'})
    code: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @OneToOne(() => _profile, (profile) => profile.user)
    profile: _profile;

    @OneToMany(() => Producto, producto => producto.user)
    productos: Producto[];

    @OneToMany(() => Pedido, pedido => pedido.usuario)
    pedidos: Pedido[];

    @OneToMany(() => Review, review => review.user)
    reviews: Review[];

    @OneToOne(() => Carrito, carrito => carrito.user)
    carrito: Carrito;

  


}