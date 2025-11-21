import { Module } from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { ComentariosController } from './comentarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { _comment } from 'src/database/entities/_comment.entity';
import { _post } from 'src/database/entities/_post.entity';
import { _user } from 'src/database/entities/_user.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      _comment,
      _post,
      _user
    ])
  ],
  controllers: [ComentariosController],
  providers: [ComentariosService],
})
export class ComentariosModule {}
