import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { InicioModule } from '../inicio/inicio.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    InicioModule
],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
