import { Controller, Post, Body, Get, Param, UseGuards, Req } from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('comentarios')
export class ComentariosController {
  constructor(private readonly comentariosService: ComentariosService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateComentarioDto, @Req() req) {
    return this.comentariosService.create(dto, req.user);
  }

  @Get(':postId')
  findByPost(@Param('postId') postId: number) {
    return this.comentariosService.findByPostId(postId);
  }

}
