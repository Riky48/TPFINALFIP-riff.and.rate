import { Entity } from "typeorm";

@Entity('_user')
export class _user{
    id_user: number;

    name_:string;

    last_name: string;

    email: string;

    password: string;

    is_admin: boolean;

    code: string;

    created_at: Date;
}