import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    descripcion: string;

    @Column()
    multimedia_url: string;

    @CreateDateColumn({type: 'timestamp'})
    fecha_creacion: Date;
}
