import { Entity } from "typeorm";

@Entity('_like')
export class _like{
    id_like:number;

    id_user:number;

    id_comment:number;

    id_comment_of_comment:number;

    created_at:Date;
}