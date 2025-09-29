export interface JwtPayload {
  email: string; // El email del usuario
  sub: number;   // El ID del usuario (esto lo puedes cambiar dependiendo de tu base de datos)
}