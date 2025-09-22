import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { _user } from '../feed/entities/_user.entity';
import { CreateAuthDto } from './create.auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(_user)
    private readonly usersRepository: Repository<_user>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: CreateAuthDto): Promise<_user> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.usersRepository.create({
      name_: dto.name,
      last_name: dto.lastName,
      email: dto.email,
      password: hashedPassword,
      is_admin: dto.isAdmin,
      code: dto.code,
    });

    return this.usersRepository.save(user);
  }

  async login(email: string, password: string): Promise<{ access_token: string; user: Partial<_user> }> {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) throw new UnauthorizedException('Usuario o contraseña incorrectos');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Usuario o contraseña incorrectos');

    const payload = { sub: user.id_user, email: user.email };
    const token = this.jwtService.sign(payload);

    const { password: _, ...userWithoutPassword } = user;
    return { access_token: token, user: userWithoutPassword };
  }

//   async register(dto: CreateAuthDto): Promise < _user > {
//   const hashedPassword = await bcrypt.hash(dto.password, 10); // Hash password
//   const user = this.usersRepository.create({ name_: dto.name, last_name: dto.lastName, email: dto.email, password: hashedPassword, is_admin: dto.isAdmin, code: dto.code });
//   return this.usersRepository.save(user);
// }
}