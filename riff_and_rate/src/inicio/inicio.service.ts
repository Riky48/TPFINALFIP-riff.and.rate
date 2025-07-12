import { Injectable , NotFoundException } from '@nestjs/common';
import { CreateInicioDto } from './dto/create-inicio.dto';
import { UpdateInicioDto } from './dto/update-inicio.dto';
import { Inicio } from './entities/inicio.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InicioService {
  private inicio : Inicio[] = [];
  constructor(
    @InjectRepository(Inicio)
    private readonly inicioRepository: Repository<Inicio>,
  ){}


    public async getAll(): Promise<Inicio[]> {
        let inicio: Inicio[] = await this.inicioRepository.find();
        return inicio;
    }
    public async getById(id: number): Promise<Inicio> {
        let criterio : FindOneOptions<Inicio>= {where:{idInicio: id}}
        let inicio = await this.inicioRepository.findOne(criterio);

       if(!inicio) {
          throw new NotFoundException(`No se encontró la ciudad con id ${id}`);
       }

       return inicio;
    }



  create(createInicioDto: CreateInicioDto) {
    return this.inicioRepository.save(createInicioDto);
  }

  findAll() {
    return this.inicioRepository.find();
  }

  findOne(id: number) {
    return `Esta acción devuelve un inicio con el id: ${id}`;
  }

  update(id: number, updateInicioDto: UpdateInicioDto) {
    return `Esta acción actualiza un inicio con el id: ${id}`;
  }

  remove(id: number) {
    return `Esta acción elimina un inicio con el id: ${id}`;
  }
}
