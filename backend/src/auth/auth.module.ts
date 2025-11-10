import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/user/entities/user.entity';
import { JwtModule} from '@nestjs/jwt';
import { jwtConstants } from './jwt.constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
