import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { _user } from 'src/database/entities/_user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(_user)
    private readonly userRepository: Repository<_user>,
  ) {}

  async findAll(): Promise<_user[]> {
    return this.userRepository.find({
      relations: ['profile', 'productos', 'pedidos', 'reviews', 'carrito']
    });
  }

  async findOne(id: number): Promise<_user> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['profile', 'productos', 'pedidos', 'reviews', 'carrito'],
    });

    if (!user) throw new NotFoundException('Usuario no encontrado');

    return user;
  }

  async remove(id: number): Promise<string> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Usuario no encontrado');

    return 'Usuario eliminado con éxito';
  }
}
