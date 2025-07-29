import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Recursos sobrevalorados? puede ser';
  }
}
