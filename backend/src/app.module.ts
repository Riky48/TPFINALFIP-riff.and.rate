import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './pag_inicio/posts/posts.module';
import { FeedModule } from './feed/feed.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProductoModule } from './marketplace/producto.module';
import { CategoriaModule } from './marketplace/categoria/categoria.module';
import { MarcaModule } from './marketplace/marca/marca.module';
import { CarritoModule } from './marketplace/carrito/carrito.module';
import { PedidoModule } from './marketplace/pedido/pedido.module';

import { PerfilModule } from './perfil/perfil.module';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { ComentariosModule } from './comentarios/comentarios.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),

        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        autoLoadEntities: true,
        synchronize: true,
        extra: {
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
    ProductoModule,
    MarcaModule,
    CategoriaModule,
    CarritoModule,
    PedidoModule,

    PerfilModule,
    PerfilModule,
    ComentariosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
