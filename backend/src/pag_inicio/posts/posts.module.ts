import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { _post } from '../../database/entities/_post.entity';
import { _multimedia } from '../../database/entities/_multimedia.entity';
import { _profile } from '../../database/entities/_profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([_post,_multimedia,_profile]),
    
],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
