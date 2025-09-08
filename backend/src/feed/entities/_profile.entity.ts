import { Entity } from "typeorm";

@Entity('_profile')
export class _profile{
    id_user: number;

    gender: boolean; 

    phone_number: string;

    birthday: Date;

    bio:string;

    image_:string;

    image_header: string;

    is_premium: boolean;

    email_perfil: string;

    is_verified: boolean;

    country_id: number;
}