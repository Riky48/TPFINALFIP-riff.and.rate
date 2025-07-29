import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    descripcion: string;

    @Column()
    multimedia_url: string;

    @Column()
    fecha_creacion: Date;

    constructor(id:number, user_id:number, descripcion:string, multimedia_url:string, fecha_creacion:Date) {
        this.id = id;
        this.user_id = user_id;
        this.descripcion = descripcion;
        this.multimedia_url = multimedia_url;
        this.fecha_creacion = fecha_creacion;
        
    }

    public getIdPost(): number { return this.id; }
    public setIdPost(id: number): void { this.id = id; }
    public getUser_id(): number { return this.user_id; }
    public setUser_id(user_id: number): void { this.user_id = user_id; }
    public getDescripcion(): string { return this.descripcion; }
    public setDescripcion(descripcion: string): void { this.descripcion = descripcion; }
    public getMultimedia_url(): string { return this.multimedia_url; }
    public setMultimedia_url(multimedia_url: string): void { this.multimedia_url = multimedia_url; }
    public getFecha_creacion(): Date { return this.fecha_creacion; }        
    public setFecha_creacion(fecha_creacion: Date): void { this.fecha_creacion = fecha_creacion; }

}
