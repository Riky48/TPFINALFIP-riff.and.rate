import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { compare, hash } from "bcrypt";
import { _user } from "src/database/entities/_user.entity";
import { RegisterAuthDto } from "./dto/register-auth.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(_user)
    private readonly userRepository: Repository<_user>,
    private jwtService: JwtService
  ) { }

  async register(dto: RegisterAuthDto) {
    try {
      const { password, name, lastName, email } = dto;

      if (!password) {
        throw new BadRequestException('Password is required');
      }

      const hashed = await hash(password, 10);

      // Mapear correctamente a los campos de _user
      const userToSave: Partial<_user> = {
        name_: name,          // <-- CAMPO CORRECTO
        last_name: lastName,  // <-- CAMPO CORRECTO
        email,
        password: hashed,     // Se guarda en password_ por el @Column()
        is_admin: false,
        code: '0000',         // O lo que corresponda
      };

      const user = await this.userRepository.save(userToSave);

      const payload = { id: user.id, email: user.email };
      const token = this.jwtService.sign(payload);

      return { user, token };
    } catch (error: any) {
      console.error('Error en register:', error);

      if (error?.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException('El email ya está registrado');
      }
      throw error;
    }
  }

  async login(dto: LoginAuthDto) {
    const { email, password } = dto;

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new HttpException('USER_NOT_FOUND', 404);
    }

    const ok = await compare(password, user.password);
    if (!ok) {
      throw new HttpException('PASSWORD_INCORRECT', 403);
    }

    const payload = { id: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return { user, token };
  }

  async findById(id: number): Promise<_user> {
  const user = await this.userRepository.findOne({ where: { id: id} });
  if (!user) throw new HttpException("USER_NOT_FOUND", 404);
  return user;
}
}

 

