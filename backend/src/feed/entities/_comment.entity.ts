import { Entity } from "typeorm";

@Entity('_comment')
export class _comment{
    id_comment:number;

    id_post:number;

    id_user:number;

    content:string;

    created_at:Date;
}