import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Inicio {
    @PrimaryGeneratedColumn()
    idInicio: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @Column()
    imagen: string;
    constructor(id:number, nombre:string, descripcion:string, imagen:string) {
        this.idInicio = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
    }
    
    public getIdInicio(): number { return this.idInicio; }
    public setIdInicio(idInicio: number): void { this.idInicio = idInicio; }
    public getNombre(): string { return this.nombre; }
    public setNombre(nombre: string): void { this.nombre = nombre; }
    public getDescripcion(): string { return this.descripcion; }
    public setDescripcion(descripcion: string): void { this.descripcion = descripcion; }
    public getImagen(): string { return this.imagen; }
    public setImagen(imagen: string): void { this.imagen = imagen; }
}
