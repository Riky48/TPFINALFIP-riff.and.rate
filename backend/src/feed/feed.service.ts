import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';
import { FeedDto } from './dto/feed.dto';
import { mappingFeed } from './feed.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { _post } from './entities/_post.entity';
import { Repository } from 'typeorm';
import { _multimedia } from './entities/_multimedia.entity';
import { profile } from 'console';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(_post)
    private readonly postRepository: Repository<_post>,
    @InjectRepository(_multimedia)
    private readonly multimediaRepository: Repository<_multimedia>,
  ) { }


  async createPost(@Body() createFeedDto: CreateFeedDto): Promise<FeedDto[]> {
    const post = this.postRepository.create({
      title: createFeedDto.title,
      content: createFeedDto.content,
      created_at: new Date(),
      profile: {id_user: createFeedDto.profile_id} as any,
    });

    await this.postRepository.save(post);

    if(createFeedDto.multimediaIds?.length){
      const multimedia = await this.multimediaRepository.findByIds(createFeedDto.multimediaIds);
      post.multimedias = multimedia;
      await this.postRepository.save(post);
    }
    return this.joinFeed(createFeedDto.profile_id);
  }

  findAll() {
    return `This action returns all feeds`;
  }
  // feed.service.ts
  async joinFeed(id_user?: number): Promise<any[]> {
  const query = this.postRepository
    .createQueryBuilder('post')
    .leftJoinAndSelect('post.profile', 'profile')
    .leftJoinAndSelect('profile.user', 'user')
    .leftJoinAndSelect('post.multimedias', 'multimedia')
    .leftJoinAndSelect('post.comments', 'comment')
    .leftJoinAndSelect('comment.comment_of_comments', 'comment_of_comment')
    .leftJoinAndSelect('post.likes', 'likes');

  if (id_user) {
    query.where('user.id_user = :id_user', { id_user });
  }

  const posts = await query.getMany();

  if (posts.length === 0) {
    throw new NotFoundException('No se encontró el feed');
  }

  // Mapeo los posts a FeedDto
  const mappedPosts = posts.map((post) =>
    mappingFeed(
      post.profile.user,
      post.profile,
      post,
      post.likes.length,
      post.multimedias,
      post.comments.map((c) => ({
        ...c,
        replies: c.comment_of_comments,
      }))
    )
  );

  // Agrupo los posts por usuario
  const grouped = mappedPosts.reduce((acc, feed) => {
    const userId = feed.user.id;

    if (!acc[userId]) {
      acc[userId] = {
        user: feed.user,
        profile: feed.user.profile,
        posts: [],
      };
    }

    acc[userId].posts.push(feed.posts);
    return acc;
  }, {});

  return Object.values(grouped);
}






  findOne(id: number) {
    return `This action returns a #${id} feed`;
  }

  update(id: number, updateFeedDto: UpdateFeedDto) {
    return `This action updates a #${id} feed`;
  }

  remove(id: number) {
    return `This action removes a #${id} feed`;
  }
}
