import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { _user } from 'src/database/entities/_user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([_user])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
