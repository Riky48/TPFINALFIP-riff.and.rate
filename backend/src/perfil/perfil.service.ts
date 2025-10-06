import { Injectable } from '@nestjs/common';

@Injectable()
export class PerfilService {
  private perfiles = [
    { id: '1', nombre: 'Valentín', bio: 'Amante de la música 🎵', foto: 'default.jpg' },
  ];

  getPerfil(id: string) {
    return this.perfiles.find(p => p.id === id);
  }

  updatePerfil(id: string, data: any) {
    const perfil = this.perfiles.find(p => p.id === id);
    if (perfil) {
      Object.assign(perfil, data);
      return { mensaje: 'Perfil actualizado', perfil };
    }
    return { mensaje: 'Perfil no encontrado' };
  }
}

