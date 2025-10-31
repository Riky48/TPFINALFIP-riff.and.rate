import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { _post } from '../database/entities/_post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { _multimedia } from '../database/entities/_multimedia.entity';
import { _user } from '../database/entities/_user.entity';
import { _comment } from '../database/entities/_comment.entity';
import { _profile } from '../database/entities/_profile.entity';
import { _comment_of_comment } from '../database/entities/_comment_of_comment.entity';
import { _like } from '../database/entities/_like.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([_post,_multimedia,_user,_profile,_comment,_comment_of_comment,_like])
  ],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
