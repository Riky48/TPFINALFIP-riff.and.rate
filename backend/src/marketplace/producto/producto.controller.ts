import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { Producto } from '../entities/Producto.entity';

@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  // POST /productos
  @Post()
  create(@Body() data: Partial<Producto>) {
    return this.productoService.create(data);
  }

  // GET /productos
  @Get()
  findAll() {
    return this.productoService.findAll();
  }

  // GET /productos/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productoService.findOne(+id);
  }
}
