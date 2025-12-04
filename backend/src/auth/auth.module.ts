import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule} from '@nestjs/jwt';
import { jwtConstants } from './jwt.constants';
import { JwtStrategy } from './jwt.strategy';

import { _user } from 'src/database/entities/_user.entity';
import { _profile } from 'src/database/entities/_profile.entity';
import { _country } from 'src/database/entities/_country.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([_user, _profile, _country]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1200s' },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService], // opcional, pero recomendado
})
export class AuthModule {}
