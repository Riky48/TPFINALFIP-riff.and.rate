import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { users } from '../inicio/entities/inicio.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(users)
    private userRepository: Repository<users>,
  ) { }

  async createPostWithFile(createPostDto: CreatePostDto, file: UploadedFile): Promise<Post> {
    const user = await this.userRepository.findOneBy({ id: createPostDto.userId });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const publicUrl = `/uploads/${file.filename}`;

    const post = this.postRepository.create({
      descripcion: createPostDto.descripcion,
      multimedia_url: publicUrl,
      user: user
    });
    return await this.postRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find({
      relations: ['user'], // para que traiga el usuario relacionado
    });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) {
      throw new NotFoundException(`Post con id ${id} no encontrado`);
    }
    return post;
  }


  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    await this.postRepository.update(id, updatePostDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}
