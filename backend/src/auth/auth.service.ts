import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { _user } from '../feed/entities/_user.entity'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './create.auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(_user)
    private usersRepository: Repository<_user>,
    private jwtService: JwtService,
  ) {}

  async register(dto: CreateAuthDto): Promise<_user> {
    const hashedPassword = await bcrypt.hash(dto.password, 10); // Hash password
    const user = this.usersRepository.create({ name_: dto.name, last_name: dto.lastName, email: dto.email, password: hashedPassword, is_admin: dto.isAdmin, code: dto.code });
    return this.usersRepository.save(user);
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Contraseña incorrecta');
    }

    const payload = { email: user.email, sub: user.id_user };
    return this.jwtService.sign(payload);
  }
}