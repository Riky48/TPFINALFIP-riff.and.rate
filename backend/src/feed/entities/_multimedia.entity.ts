import { Entity } from "typeorm";

@Entity('_multimedia')
export class _multimedia{
    id_multimedia: number;

    src: string;

    title: string;

    created_at: Date;

    id_user: number;
}