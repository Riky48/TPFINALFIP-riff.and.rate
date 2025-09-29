import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InicioModule } from './pag_inicio/inicio/inicio.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './pag_inicio/posts/posts.module';
import { FeedModule } from './feed/feed.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: 
  [ ConfigModule.forRoot({
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
      "entities": [
              "dist/**/**.entity{.ts,.js}",
      ],
      "synchronize": true,
      extra:{
        connectionLimit: 10,
        connectTimeout: 5000,
      },
      retryAttempts: 6,
      retryDelay: 3000,
    }),
    }),
    InicioModule,
    PostsModule,
    FeedModule,
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
