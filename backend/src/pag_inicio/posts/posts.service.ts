import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { _profile } from 'src/feed/entities/_profile.entity';
import { _post } from 'src/feed/entities/_post.entity';
import { _multimedia } from 'src/feed/entities/_multimedia.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(_post)
    private postRepository: Repository<_post>,
    @InjectRepository(_profile)
    private profileRepository: Repository<_profile>,
    @InjectRepository(_multimedia)
    private multimediaRepository: Repository<_multimedia>,
  ) { }

  async createPostWithFile(createPostDto: CreatePostDto, file: Express.Multer.File): Promise<_post> {
    const profile = await this.profileRepository.findOne({
      where: { id_user: createPostDto.id_user },
      relations: ['user'],
    });

    if (!profile) {
      throw new NotFoundException('Perfil no encontrado');
    }

    const publicUrl = `/uploads/${file.filename}`;

    // Crear el post
    const post = this.postRepository.create({
      title: createPostDto.title ?? 'Sin título', // valor por defecto si no hay título
      content: createPostDto.content,
      created_at: new Date(),
      profile,
      multimedias: [{
        src: publicUrl,
        title: createPostDto.title ?? 'Sin título', // obligatorio
        created_at: new Date(),
        id_user: profile.user.id_user,
        // asignamos la relación explícitamente
      }]
    });

    // Crear la multimedia y asignarle el post


    return await this.postRepository.save(post);
  }



  // async findAll(): Promise<Post[]> {
  //   return await this.postRepository.find({
  //     relations: ['user'], // para que traiga el usuario relacionado
  //   });
  // }

  // async findOne(id: number): Promise<Post> {
  //   const post = await this.postRepository.findOneBy({ id });
  //   if (!post) {
  //     throw new NotFoundException(`Post con id ${id} no encontrado`);
  //   }
  //   return post;
  // }


  // async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
  //   await this.postRepository.update(id, updatePostDto);
  //   return this.findOne(id);
  // }

  async remove(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}
