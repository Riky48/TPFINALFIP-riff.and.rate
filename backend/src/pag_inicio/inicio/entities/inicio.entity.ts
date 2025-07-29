import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('users')
export class users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    username: string;

    @Column()
    contrasenia: string;

    @Column()
    email: string;

    @Column()
    bio: string;

    @Column()
    profile_image_url: string;

    @Column()
    fecha_creacion: Date;

    constructor(id:number, nombre:string, username:string,contrasenia:string, email:string, bio:string, profile_image_url:string, fecha_creacion:Date) {
        this.id = id;
        this.nombre = nombre;
        this.username = this.username;
        this.contrasenia = this.contrasenia;
        this.email = this.email;
        this.bio = this.bio;
        this.profile_image_url = this.profile_image_url;
        this.fecha_creacion = this.fecha_creacion;
    }
    
    public getIdInicio(): number { return this.id; }
    public setIdInicio(id: number): void { this.id = id; }
    public getNombre(): string { return this.nombre; }
    public setNombre(nombre: string): void { this.nombre = nombre; }
    public getUsername(): string { return this.username; }
    public setUsername(username: string): void { this.username = username; }
    public getContrasenia(): string { return this.contrasenia; }
    public setContrasenia(contrasenia: string): void { this.contrasenia = contrasenia; }
    public getEmail(): string { return this.email; }
    public setEmail(email: string): void { this.email = email; }
    public getBio(): string { return this.bio; }
    public setBio(bio: string): void { this.bio = bio; }
    public getProfile_image_url(): string { return this.profile_image_url; }
    public setProfile_image_url(profile_image_url: string): void { this.profile_image_url = profile_image_url; }
    public getFecha_creacion(): Date { return this.fecha_creacion; }
    public setFecha_creacion(fecha_creacion: Date): void { this.fecha_creacion = fecha_creacion; }
}
