import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { _user } from '../feed/entities/_user.entity';
import { JwtStrategy } from './jwt.strategy'
import { AuthController } from './auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([_user]),
    JwtModule.register({
      secret: 'secretKey', // Cambia esta clave a una más segura
      signOptions: { expiresIn: '60s' }, // Define el tiempo de expiración del JWT
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}