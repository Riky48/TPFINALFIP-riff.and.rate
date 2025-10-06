import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import { PerfilService } from './perfil.service';

@Controller('perfil')
export class PerfilController {
  constructor(private readonly perfilService: PerfilService) {}

  @Get(':id')
  getPerfil(@Param('id') id: string) {
    return this.perfilService.getPerfil(id);
  }

  @Put(':id')
  updatePerfil(@Param('id') id: string, @Body() data: any) {
    return this.perfilService.updatePerfil(id, data);
  }
}
