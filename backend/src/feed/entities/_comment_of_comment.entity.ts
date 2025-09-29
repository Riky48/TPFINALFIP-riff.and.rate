import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { _comment } from "./_comment.entity";
import { _user } from "./_user.entity";

@Entity('_comment_of_comment')
export class _comment_of_comment {
    @PrimaryGeneratedColumn()
    id_comment_of_comment: number;

    @Column()
    id_comment: number;

    @Column()
    id_user: number;

    @Column()
    content: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;


    @ManyToOne(()=> _comment,(comment)=> comment.comment_of_comments)
    @JoinColumn({ name: 'id_comment' })
    comment: _comment;

}