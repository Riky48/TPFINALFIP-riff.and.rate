import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { _user } from './_user.entity';

@Entity({ name: '_musician_profile' })
export class _musician_profile {
  @PrimaryColumn()
  id: number;

  @OneToOne(() => _user)
  @JoinColumn({ name: 'id' })
  user: _user;

  @Column({ nullable: true })
  instrument: string;

  @Column({ type: 'int', nullable: true })
  experience_years: number;

  @Column({ nullable: true })
  skill_level: string;

  @Column({ type: 'text', nullable: true })
  influences: string;

  @Column({ type: 'text', nullable: true })
  projects: string;

  @Column({ type: 'text', nullable: true })
  availability: string;

  @Column({ nullable: true })
  music_link: string;

  @Column({ type: 'text', nullable: true })
  equipment: string;

  @Column({ type: 'text', nullable: true })
  genres: string;
}
