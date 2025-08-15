import { IsDate, IsInt, IsString, IsUrl } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { users } from "../../inicio/entities/inicio.entity";

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    @IsInt()
    id: number;

    @ManyToOne(() => users, (user) => user.posts)
    @JoinColumn({name: 'user_id'})
    user: users;


    @Column()
    @IsString()
    descripcion: string;

    @Column()
    @IsUrl()
    multimedia_url: string;

    @CreateDateColumn({type: 'timestamp'})
    @IsDate()
    fecha_creacion: Date;

}
