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
    id: number;

    @Column({length:50})
    type: string; // tipo de multimedia: imagen, video, audio, documento

    @ManyToOne(() => _post, post => post.multimedias,{onDelete:'CASCADE'})
    @JoinColumn({ name: 'id_post' })
    post: _post;
}