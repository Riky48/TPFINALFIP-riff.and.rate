import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InicioModule } from './pag_inicio/inicio/inicio.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: 
  [
    TypeOrmModule.forRoot({
      "type": 'mysql',
      "host": 'localhost',
      "port": 3306,
      "username": 'root', // Usar el usuario de tu base de datos.
      "password": 'Sallago2002', // Usar la contraseña de tu base de datos.
      "database": 'riff_and_rate', // Nombre de la base de datos.
      "entities": [
              "dist/**/**.entity{.ts,.js}",
      ],
      "synchronize": false,
    }),
    InicioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
