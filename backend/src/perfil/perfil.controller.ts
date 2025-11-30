import { Controller, Get, Post, Patch, Delete, Param, Body, Req, UseGuards } from '@nestjs/common';
import { PerfilService } from './perfil.service';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
import { CreateMusicianProfileDto } from './dto/create-musician-profile.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // 👈 asegúrate de tener tu guard

@Controller('perfil')
export class PerfilController {
  constructor(private readonly perfilService: PerfilService) {}

  // ---------------- PERFIL PERSONAL ----------------
  @Post()
  create(@Body() createDto: CreatePerfilDto) {
    return this.perfilService.create(createDto);
  }

  @Get()
  findAll() {
    return this.perfilService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.perfilService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDto: UpdatePerfilDto) {
    return this.perfilService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.perfilService.remove(id);
  }

  // ---------------- PERFIL MUSICAL ----------------
  @Post('musical/:id')
  saveMusicianProfile(
    @Param('id') id: number,
    @Body() dto: CreateMusicianProfileDto,
  ) {
    return this.perfilService.saveMusicianProfile(id, dto);
  }

  @Get('musical/:id')
  getMusicianProfile(@Param('id') id: number) {
    return this.perfilService.getMusicianProfile(id);
  }

  // ---------------- PERFIL DEL USUARIO AUTENTICADO ----------------
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMyProfile(@Req() req: any) {
    const userId = req.user.id; // 👈 viene del payload del JWT
    return this.perfilService.findOne(userId);
  }
}