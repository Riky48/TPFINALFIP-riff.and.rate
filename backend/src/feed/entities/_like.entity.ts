import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { _post } from "./_post.entity";

@Entity('_like')
export class _like {
    @PrimaryGeneratedColumn()
    id_like: number;

    @Column()
    id_user: number;

    @Column()
    id_comment: number;

    @Column()
    id_comment_of_comment: number;

    @Column({nullable:true}) 
    id_post: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @ManyToOne(() => _post, (post) => post.likes)
    @JoinColumn({ name: 'id_post' })
    post: _post;
}