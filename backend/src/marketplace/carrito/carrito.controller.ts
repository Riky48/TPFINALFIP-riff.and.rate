import { Controller, Get, Post, Delete, Body, UseGuards, Request, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CarritoService } from './carrito.service';
import { AddProductDto } from './dto/add-product.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('carrito')
export class CarritoController {
  constructor(private carritoService: CarritoService) {}

  @Get()
  async getCarrito(@Request() req) {
    const userId = req.user.id;
    return this.carritoService.getCarritoByUser(userId);
  }

  @Post('add')
  async addProducto(@Request() req, @Body() data: AddProductDto) {
    const userId = req.user.id;
    return this.carritoService.addProducto(userId, data.productoId, data.cantidad);
  }

  @Delete('remove/:productoId')
  async removeProducto(@Request() req, @Param('productoId') productoId: number) {
    const userId = req.user.id;
    return this.carritoService.removeProducto(userId, productoId);
  }

  @Delete('clear')
  async clearCarrito(@Request() req) {
    const userId = req.user.id;
    return this.carritoService.clearCarrito(userId);
  }
}
