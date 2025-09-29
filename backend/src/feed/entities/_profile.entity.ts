import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { _user } from "./_user.entity";
import { _post } from "./_post.entity";

@Entity('_profile')
export class _profile {
    @PrimaryGeneratedColumn()
    id_user: number;

    @Column()
    gender: boolean;

    @Column()
    phone_number: string;

    @Column({
        type: 'datetime',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    })
    birthday: Date;

    @Column()
    bio: string;

    @Column()
    image_: string;

    @Column()
    image_header: string;

    @Column()
    is_premium: boolean;

    @Column()
    email_perfil: string;
    @Column()
    is_verified: boolean;

    @Column()
    country_id: number;

    @OneToOne(() => _user, (user) => user.profile)
    @JoinColumn({ name: 'id_user' })
    user: _user;

    @OneToMany(() => _post, (post) => post.profile)
    posts: _post[];
}