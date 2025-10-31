import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { _profile } from "./_profile.entity";

@Entity('_user')
export class _user {
    @PrimaryGeneratedColumn()
    id_user: number;

    @Column()
    name_: string;

    @Column()
    last_name: string;

    @Column()
    email: string;

    @Column({name: 'password_'})
    password: string;

    @Column()
    is_admin: boolean;

    @Column({name: 'code_'})
    code: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @OneToOne(() => _profile, (profile) => profile.user)
    profile: _profile;
}