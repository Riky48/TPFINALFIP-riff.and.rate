import { Injectable, BadRequestException, HttpException } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { _user } from '../database/entities/_user.entity';
import { _profile } from '../database/entities/_profile.entity';
import { _country } from '../database/entities/_country.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginAuthDto } from './dto/login-auth.dto';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(_user)
    private readonly userRepository: Repository<_user>,

    @InjectRepository(_profile)
    private readonly profileRepository: Repository<_profile>,

    @InjectRepository(_country)
    private readonly countryRepository: Repository<_country>,

    private jwtService: JwtService
  ) { }

  async register(registerDto: RegisterAuthDto) {
    const { name, lastName, email, password, country } = registerDto;

    // 1. Validar email duplicado
    const userExists = await this.userRepository.findOne({ where: { email } });
    if (userExists) throw new BadRequestException("El email ya está registrado");

    // 2. Buscar país por nombre (en minúsculas, según tu front)
    const countryEntity = await this.countryRepository.findOne({
      where: { name_: country.toLowerCase() }
    });
    if (!countryEntity) throw new BadRequestException("El país enviado no existe");

    // 3. Crear usuario
    const hashedPassword = await hash(password, 10);
    const newUser = this.userRepository.create({
      name_: name,
      last_name: lastName,
      email,
      password: hashedPassword,
      is_admin: false,
      code: "" // opcional
    });
    const savedUser = await this.userRepository.save(newUser);

    // 4. Crear perfil mínimo, los demás campos opcionales
    const profile = this.profileRepository.create({
      id_user: savedUser.id_user,
      gender: false,          // obligatorio
      phone_number: '',       // obligatorio si no permite NULL
      birthday: new Date(),
      bio: '',
      image_: '',
      image_header: '',
      is_premium: false,
      email_perfil: email,
      is_verified: false,
      country: countryEntity,
      user: savedUser
    });
    await this.profileRepository.save(profile);

    // 5. Generar token
    const payload = { id: savedUser.id_user, email: savedUser.email };
    const token = this.jwtService.sign(payload);

    return { message: "Usuario creado correctamente", user: savedUser, token };
  }

  async login(loginDto: LoginAuthDto) {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new HttpException("USER_NOT_FOUND", 404);

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) throw new HttpException("PASSWORD_INCORRECT", 403);

    const payload = { id: user.id_user, email: user.email };
    const token = this.jwtService.sign(payload);

    return { user, token };
  }

  async findById(id: number): Promise<_user> {
  const user = await this.userRepository.findOne({ where: { id_user: id } });
  if (!user) throw new HttpException("USER_NOT_FOUND", 404);
  return user;
}
}

