import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { _multimedia } from "./_multimedia.entity";
import { _comment } from "./_comment.entity";
import { _like } from "./_like.entity";
import { _profile } from "./_profile.entity";

@Entity('_post')
export class _post {
  @PrimaryGeneratedColumn()
  id_post: number;

  @Column()
  type:string; 

  @Column({ length: 300,default:'Sin título' })
  title: string;

  @Column({ length: 4500, nullable: true })
  content: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => _profile, (profile) => profile.posts, { eager: true })
  @JoinColumn({ name: 'id_user' })
  profile: _profile;

  @OneToMany(() => _like, (like) => like.post)
  likes: _like[];

  @OneToMany(() => _comment, (comment) => comment.post)
  comments: _comment[];

  @OneToMany(() => _multimedia, (multimedia) => multimedia.post,{cascade:true,onDelete:'CASCADE'})
  multimedias: _multimedia[];
}