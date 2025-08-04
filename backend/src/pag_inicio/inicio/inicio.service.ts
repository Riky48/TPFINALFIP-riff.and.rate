import { Injectable , NotFoundException } from '@nestjs/common';
import { CreateInicioDto } from './dto/create-inicio.dto';
import { UpdateInicioDto } from './dto/update-inicio.dto';
import { users } from './entities/inicio.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InicioService {
  constructor(
    @InjectRepository(users)
    private readonly inicioRepository: Repository<users>,
  ){}
    public async findOne(id: number): Promise<users> {
        let criterio : FindOneOptions<users>= {where:{id: id}}
        let users = await this.inicioRepository.findOne(criterio);

       if(!users) {
          throw new NotFoundException(`No se encontró el usuario con id ${id}`);
       }

       return users;
    }



  create(createInicioDto: CreateInicioDto) {
    return this.inicioRepository.save(createInicioDto);
  }

  async findAll(): Promise<users[]> {
    let users: users[] = await this.inicioRepository.find();
    return users;
  }

  update(id: number, updateInicioDto: UpdateInicioDto) {
    return `Esta acción actualiza un inicio con el id: ${id}`;
  }

  remove(id: number) {
    return `Esta acción elimina un inicio con el id: ${id}`;
  }
}
