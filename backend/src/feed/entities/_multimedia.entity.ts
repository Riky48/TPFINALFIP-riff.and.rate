import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { _post } from "./_post.entity";

@Entity('_multimedia')
export class _multimedia {
    @PrimaryGeneratedColumn()
    id_multimedia: number;

    @Column()
    src: string;

    @Column()
    title: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @Column()
    id_user: number;

    @ManyToOne(() => _post, (post) => post.multimedias)
    @JoinColumn({ name: 'id_post' })
    post: _post;

    @Column({ nullable: true })
    id_post: number;
}