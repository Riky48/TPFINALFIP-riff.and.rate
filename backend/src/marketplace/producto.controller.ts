import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProductoService } from './producto.service';
import { Producto } from 'src/database/entities/Producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard) // Aplica a todo el controller
@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  // GET - Listar todos
  @Get()
  async findAll(): Promise<Producto[]> {
    return this.productoService.findAll();
  }

  // Buscar por nombre
  @Get('search/:nombre')
  async search(@Param('nombre') nombre: string): Promise<Producto[]> {
    return this.productoService.searchByNombre(nombre);
  }

  // GET - Buscar por ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Producto> {
    return this.productoService.findOne(+id);
  }

  // POST - Crear producto (usa user del JWT)
  @Post()
  async create(@Body() data: CreateProductoDto, @Req() req): Promise<Producto> {
    const userId = req.user.id; // el payload del JWT debe incluir el id
    return this.productoService.create({ ...data, userId });
  }

  // PUT - Actualizar producto
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<CreateProductoDto>,
    @Req() req,
  ): Promise<Producto> {
    const userId = req.user.id;
    // opcional: validar que el user pueda actualizar este producto
    return this.productoService.update(+id, { ...data, userId });
  }

  // DELETE - Eliminar producto
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.productoService.remove(+id);
  }
}
