import { Injectable, BadRequestException, HttpException } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginAuthDto } from './dto/login-auth.dto';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async register(userObject: RegisterAuthDto) {
    try {
      const { password } = userObject;
      if (!password) {
        throw new BadRequestException('Password is required');
      }
      const hashed = await hash(password, 10);
      const userToSave = { ...userObject, password: hashed } as Partial<User>;
      const user = await this.userRepository.save(userToSave as any);

      const payload = { id: user.id, email: user.email};
      const token = this.jwtService.sign(payload);

      const data = {
        user,
        token
      };
      return data;
    } catch (error: any) {
      console.error('Error en register:', error);
      // Manejar errores de duplicado de email
      if (error?.code === 'ER_DUP_ENTRY' || error?.sqlMessage?.includes('Duplicate')) {
        throw new BadRequestException('El email ya está registrado');
      }
      throw error;
    }
  }

  async login(userObjectLogin: LoginAuthDto) {
    const {email, password} = userObjectLogin;
    const findUser = await this.userRepository.findOneBy({email});
    if (!findUser) {
      throw new HttpException('USER_NOT_FOUND', 404);
    }

    const checkPassword = await compare(password, findUser.password);
    if (!checkPassword) {
      throw new HttpException('PASSWORD_INCORRECT', 403);
    }

<<<<<<< HEAD
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Usuario o contraseña incorrectos');

    const payload = { sub: user.id, email: user.email };
=======
    const payload = {id: findUser.id, email: findUser.email};
>>>>>>> main
    const token = this.jwtService.sign(payload);

    const data = {
      user: findUser,
      token
    };
    return data;
  }
}
