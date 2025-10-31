import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { _post } from "./_post.entity";
import { _comment_of_comment } from "./_comment_of_comment.entity";

@Entity('_comment')
export class _comment {
    @PrimaryGeneratedColumn()
    id_comment: number;

    @Column({ name: 'id_user' })
    id_user: number;

    @Column()
    content: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @ManyToOne(() => _post, (post) => post.comments)
    @JoinColumn({ name: 'id_post' })
    post: _post;

    @OneToMany(() => _comment_of_comment, (comment_of_comment) => comment_of_comment.comment)
    comment_of_comments: _comment_of_comment[];
}