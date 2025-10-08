import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoModule } from './marketplace/producto.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'riffandrate',
      autoLoadEntities: true,
      synchronize: true, // cuidado en prod!
    }),
    ProductoModule,
  ],
})
export class AppModule {}
