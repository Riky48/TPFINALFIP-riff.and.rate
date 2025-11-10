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
    const { password } = userObject;
    if (!password) {
      throw new BadRequestException('Password is required');
    }
    const hashed = await hash(password, 10);
    const userToSave = { ...userObject, password: hashed } as Partial<User>;
    return this.userRepository.save(userToSave as any);
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

    const payload = {id: findUser.id, email: findUser.email};
    const token = this.jwtService.sign(payload);

    const data = {
      user: findUser,
      token
    };
    return data;
  }
}
