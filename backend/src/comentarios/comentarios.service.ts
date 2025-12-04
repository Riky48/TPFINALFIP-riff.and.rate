import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { _comment } from '../database/entities/_comment.entity';
import { _post } from '../database/entities/_post.entity';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { _user } from 'src/database/entities/_user.entity';

@Injectable()
export class ComentariosService {
  constructor(
    @InjectRepository(_comment)
    private readonly commentRepo: Repository<_comment>,

    @InjectRepository(_user)
    private readonly userRepo: Repository<_user>,

    @InjectRepository(_post)
    private readonly postRepo: Repository<_post>,
  ) { }

  async create(dto: CreateComentarioDto, userPayload: any) {


    // Buscar post
    const post = await this.postRepo.findOneBy({ id_post: dto.id_post });


    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const user = await this.userRepo.findOneBy({ id: userPayload.id });
    if (!user) throw new NotFoundException('User not found');

    const newComment = this.commentRepo.create({
      content: dto.content,
      post,
      user, // user completo
    });



    try {
      const saved = await this.commentRepo.save(newComment);

      return saved;
    } catch (err) {

      throw err;
    }
  }

  async findByPostId(postId: number) {
    const rawComments = await this.commentRepo
      .createQueryBuilder('c')
      .leftJoin('_user', 'u', 'u.id = c.id_user')
      .where('c.id_post = :postId', { postId })
      .orderBy('c.created_at', 'DESC')
      .select([
        'c.id_comment AS id_comment',
        'c.content AS content',
        'c.created_at AS created_at',
        'u.id AS id',
        'u.name_ AS name_',
        'u.last_name AS last_name',
      ])
      .getRawMany();

    // mapeo la query para que sea mas facil de consumir en el front
    return rawComments.map(c => ({
      id_comment: c.id_comment,
      content: c.content,
      created_at: c.created_at,
      user: {
        id: c.id,
        name_: c.name_,
        last_name: c.last_name,
      }
    }));
  }

}
