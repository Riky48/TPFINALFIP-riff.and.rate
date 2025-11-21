import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { _post } from "./_post.entity";
import { _comment_of_comment } from "./_comment_of_comment.entity";
import { _user } from "./_user.entity";

@Entity('_comment')
export class _comment {
    @PrimaryGeneratedColumn()
    id_comment: number;

    @ManyToOne(() => _user)
    @JoinColumn({ name: 'id_user' })  // ESTA ES LA FK DE LA TABLA COMMENT
    user: _user;

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