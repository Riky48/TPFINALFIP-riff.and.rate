import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { _profile } from 'src/feed/entities/_profile.entity';
import { _post } from 'src/feed/entities/_post.entity';
import { _multimedia } from 'src/feed/entities/_multimedia.entity';
import { BadRequestException } from '@nestjs/common';
import { UpdatePostDto } from './dto/update-post.dto';

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



  async createPostWithFiles(createPostDto: CreatePostDto, files: Express.Multer.File[]): Promise<_post> {
    const profile = await this.profileRepository.findOne({
      where: { id_user: createPostDto.id_user },
      relations: ['user'],
    });

    if (!profile) {
      throw new NotFoundException('Perfil no encontrado');
    }

    const now = new Date();

    // tipos MIME permitidos
    const allowedMimeTypes = [
      'image/',           // jpg, png, gif, etc.
      'video/',           // mp4, webm, etc.
      'application/pdf',  // pdf
    ];

    // validar que todos los archivos sean permitidos
    for (const file of files) {
      if (!allowedMimeTypes.some(type => file.mimetype.startsWith(type))) {
        throw new BadRequestException(`Formato de archivo no permitido: ${file.originalname}`);
      }
    }

    // mapear a entidades multimedia
    const multimedias = files.map(file => {
      let type: string;

      if (file.mimetype.startsWith('image/')) {
        type = 'image';
      } else if (file.mimetype.startsWith('video/')) {
        type = 'video';
      } else if (file.mimetype === 'application/pdf') {
        type = 'pdf';
      } else {
        throw new BadRequestException(`Formato no soportado: ${file.originalname}`);
      }

      return {
        src: `/uploads/${file.filename}`,
        title: createPostDto.title ?? 'Sin título',
        created_at: now,
        id_user: profile.user.id_user,
        type,
      };
    });

    const post = this.postRepository.create({
      title: createPostDto.title ?? 'Sin título',
      content: createPostDto.content,
      created_at: now,
      profile,
      multimedias,
    });

    return await this.postRepository.save(post);
  }



  async remove(id: number): Promise<void> {

    await this.postRepository.delete(id);
  }

  async update(arg0: number, updatePostDto: UpdatePostDto) {
    throw new Error('Method not implemented.');
  }
}
