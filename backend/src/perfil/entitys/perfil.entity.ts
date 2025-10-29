// src/perfil/entitys/perfil.entity.ts
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Country } from './country.entity';

@Entity('_profile')
export class Perfil {
  @PrimaryColumn()
  id_user: number;

  @Column({ type: 'boolean' })
  gender: boolean;

  @Column({ length: 25 })
  phone_number: string;

  @Column({ type: 'date' })
  birthday: Date;

  @Column({ length: 255 })
  bio: string;

  @Column({ length: 255 })
  image: string;

  @Column({ length: 255 })
  image_header: string;

  @Column({ type: 'boolean' })
  is_premium: boolean;

  @Column({ length: 60 })
  email_perfil: string;

  @Column({ type: 'boolean' })
  is_verified: boolean;

  @Column()
  country_id: number;

  @ManyToOne(() => User, user => user.perfil)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @ManyToOne(() => Country, country => country.perfiles)
  @JoinColumn({ name: 'country_id' })
  country: Country;
}