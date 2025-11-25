import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { Producto } from 'src/database/entities/Producto.entity';

@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  // POST - Crear producto
  @Post()
  async create(@Body() data: Partial<Producto>): Promise<Producto> {
    return this.productoService.create(data);
  }

  // GET - Listar todos
  @Get()
  async findAll(): Promise<Producto[]> {
    return this.productoService.findAll();
  }

  // GET - Buscar por ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Producto> {
    return this.productoService.findOne(+id);
  }

  // PUT - Actualizar producto
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Producto>,
  ): Promise<Producto> {
    return this.productoService.update(+id, data);
  }

  // DELETE - Eliminar producto
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.productoService.remove(+id);
  }

  // Buscar productos por nombre
  @Get('search/:nombre')
async search(@Param('nombre') nombre: string): Promise<Producto[]> {
  return this.productoService.searchByNombre(nombre);
}

}
