import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';
import { FeedDto } from './dto/feed.dto';
import { mappingFeed } from './feed.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { _post } from '../database/entities/_post.entity';
import { Repository } from 'typeorm';
import { _multimedia } from '../database/entities/_multimedia.entity';


@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(_post)
    private readonly postRepository: Repository<_post>,
    @InjectRepository(_multimedia)
    private readonly multimediaRepository: Repository<_multimedia>,
  ) { }

  // Nota: El controlador debe pasar el DTO; no usar @Body() aquí.
  async createPost(createFeedDto: CreateFeedDto): Promise<FeedDto[]> {
    try {
      // Validaciones básicas
      if (!createFeedDto) {
        throw new BadRequestException('Datos del post no provistos');
      }
      if (!createFeedDto.title) {
        throw new BadRequestException('El título es obligatorio');
      }
      if (!createFeedDto.user_id) {
        throw new BadRequestException('El perfil (profile_id) es obligatorio');
      }

      const post = this.postRepository.create({
        title: createFeedDto.title,
        content: createFeedDto.content ?? '',
        created_at: new Date(),
        profile: { id_user: createFeedDto.user_id } as any,
      });

      await this.postRepository.save(post);

      if (createFeedDto.multimediaIds?.length) {
        // Si usás TypeORM antiguo findByIds está OK; si no, reemplazá por find + In.
        const multimedia = await this.multimediaRepository.findByIds(createFeedDto.multimediaIds);

        // Si faltó alguno
        if (multimedia.length !== createFeedDto.multimediaIds.length) {
          throw new NotFoundException('Algunos archivos multimedia no existen');
        }

        post.multimedias = multimedia;
        await this.postRepository.save(post);
      }

      return this.joinFeed(createFeedDto.user_id);
    } catch (error) {
      // Re-lanzar excepciones HTTP conocidas para que el controlador las maneje
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }

      // Log para debugging (puede quedar en consola o logger)
      console.error('createPost error:', error);
      throw new InternalServerErrorException('Error interno al crear el post');
    }
  }

  findAll() {
    return `This action returns all feeds`;
  }

  // feed.service.ts
  async joinFeed(id_user?: number): Promise<any[]> {
    try {
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
          post.likes?.length ?? 0,
          post.multimedias ?? [],
          post.comments?.map((c) => ({
            ...c,
            replies: c.comment_of_comments,
          })) ?? [],
        ),
      );

      return mappedPosts;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      console.error('joinFeed error:', error);
      throw new InternalServerErrorException('Error al obtener el feed');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} feed`;
  }

  async update(
    postId: number,
    userId: number,
    updateFeedDto: UpdateFeedDto
  ): Promise<{ message: string }> {
    try {
      // Buscar el post con su relación al usuario
      const post = await this.postRepository.findOne({
        where: { id_post: postId },
        relations: ['profile', 'profile.user'],
      });

      // Si no existe → 404
      if (!post) {
        throw new NotFoundException('No se encontró el post');
      }

      // Si el usuario no es el dueño → 403
      if (post.profile.user.id_user !== userId) {
        throw new ForbiddenException('No tienes permisos para editar este post');
      }

      // Si no se envía ni título ni contenido → 400
      if (!updateFeedDto.title && !updateFeedDto.content) {
        throw new BadRequestException('Debe enviar al menos un campo para actualizar');
      }

      // Actualizamos los campos opcionales
      if (updateFeedDto.title) post.title = updateFeedDto.title;
      if (updateFeedDto.content) post.content = updateFeedDto.content;

      // Guardar cambios
      await this.postRepository.save(post);

      return { message: 'Post actualizado correctamente' };

    } catch (error) {
      console.error('Error al actualizar el post:', error);
      throw new InternalServerErrorException('Error interno al actualizar el post');
    }
<<<<<<< HEAD

    if(post.profile.user.id !== userId){
      throw new ForbiddenException('No tienes permisos para borrar este post');
    }
    await this.postRepository.remove(post);
    return {message: 'Post eliminado correctamente'};
=======
>>>>>>> main
  }


  async removePost(postId: number, userId: number): Promise<{ message: string }> {
    try {
      const post = await this.postRepository.findOne({
        where: { id_post: postId },
        relations: ['profile', 'profile.user'],
      });

      if (!post) {
        throw new NotFoundException('No se encontró el post');
      }

      if (post.profile.user.id_user !== userId) {
        throw new ForbiddenException('No tienes permisos para borrar este post');
      }

      await this.postRepository.remove(post);
      return { message: 'Post eliminado correctamente' };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) throw error;
      console.error('removePost error:', error);
      throw new InternalServerErrorException('Error al eliminar el post');
    }
  }
}
