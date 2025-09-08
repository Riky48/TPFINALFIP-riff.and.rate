import { Entity } from "typeorm";

@Entity('_post')
export class _post {
   id_post: number;

   id_user: number;

   title: string;

   content: string;
   
   created_at: Date;

   id_multimedia: number;
}