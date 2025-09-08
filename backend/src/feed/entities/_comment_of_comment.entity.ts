import { Entity } from "typeorm";

@Entity('_comment_of_comment')
export class _comment_of_comment{
    id_comment_of_comment:number;

    id_comment:number;

    id_user:number;

    content:string;

    created_at:Date;
}