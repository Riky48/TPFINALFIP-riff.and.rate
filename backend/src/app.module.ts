import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './pag_inicio/posts/posts.module';
import { FeedModule } from './feed/feed.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PerfilModule } from './perfil/perfil.module';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ComentariosModule } from './comentarios/comentarios.module';

@Module({
  imports:
  [ 
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, unique + file.originalname);
        },
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
  }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
      "type": 'mysql',
      "host": config.get<string>('DB_HOST'),
      "port": config.get<number>('DB_PORT'),
      "username": config.get<string>('DB_USER'),
      "password": config.get<string>('DB_PASSWORD'),
      "database": config.get<string>('DB_NAME'),
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      autoLoadEntities: true,
      synchronize: true,
      extra:{
        connectionLimit: 10,
        connectTimeout: 5000,
      },
      retryAttempts: 6,
      retryDelay: 3000,
    }),
    }),
  
    PostsModule,
    FeedModule,
    UserModule,
    AuthModule,
    PerfilModule,
    ComentariosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
