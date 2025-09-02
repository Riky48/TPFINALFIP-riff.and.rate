import { IsDate, IsEmail, IsInt, IsString, IsUrl } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Post } from "../../posts/entities/post.entity";

@Entity('users')
export class users {
    
    @PrimaryGeneratedColumn()
    @IsInt()
    id: number;

    @Column()
    @IsString()
    nombre: string;

    @Column()
    @IsString()
    username: string;

    @Column()
    contrasenia: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @IsString()
    bio: string;

    @Column()
    @IsUrl()
    profile_image_url: string;

    @Column()
    @IsDate()
    fecha_creacion: Date;

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[];

}
