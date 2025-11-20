import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { _profile} from "./_profile.entity"

@Entity()
export class _country{
    @PrimaryGeneratedColumn()
    country_id: number;

    @Column()
    name_ :string;

    @Column()
    preffix:string;

    @OneToMany(() => _profile, profile => profile.country)
    perfiles: _profile[];
}