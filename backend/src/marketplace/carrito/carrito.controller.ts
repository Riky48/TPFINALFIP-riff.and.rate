import { Controller, Get, Param, Post, Delete, Body } from '@nestjs/common';
import { CarritoService } from './carrito.service';
import { AddProductDto } from './dto/add-product.dto';

@Controller('carrito')
export class CarritoController {
  constructor(private carritoService: CarritoService) {}

  @Get(':userId')
  async getCarrito(@Param('userId') userId: number) {
    return this.carritoService.getCarritoByUser(userId);
  }

  @Post(':userId/add')
  async addProducto(
    @Param('userId') userId: number,
    @Body() body: { productoId: number; cantidad: number }
  ) {
    return this.carritoService.addProducto(userId, body.productoId, body.cantidad);
  }

  @Delete(':userId/remove/:productoId')
  async removeProducto(
    @Param('userId') userId: number,
    @Param('productoId') productoId: number
  ) {
    return this.carritoService.removeProducto(userId, productoId);
  }

  @Delete(':userId/clear')
  async clearCarrito(@Param('userId') userId: number) {
    return this.carritoService.clearCarrito(userId);
  }

 

@Post(':userId/agregar')
addProductoToCarrito(
  @Param('userId') userId: number,
  @Body() data: AddProductDto,
) {
  return this.carritoService.addProducto(userId, data.productId, data.quantity);
}

}

