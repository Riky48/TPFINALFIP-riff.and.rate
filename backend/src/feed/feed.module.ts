import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { _post } from './entities/_post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { _multimedia } from './entities/_multimedia.entity';
import { _user } from './entities/_user.entity';
import { _comment } from './entities/_comment.entity';
import { _profile } from './entities/_profile.entity';
import { _comment_of_comment } from './entities/_comment_of_comment.entity';
import { _like } from './entities/_like.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([_post,_multimedia,_user,_profile,_comment,_comment_of_comment,_like])
  ],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
