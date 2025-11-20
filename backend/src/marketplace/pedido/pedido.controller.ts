// src/marketplace/pedido/pedido.controller.ts
import { Controller, Post, Param, Get } from '@nestjs/common';
import { PedidoService } from './pedido.service';

@Controller('pedido')
export class PedidoController {
  constructor(private pedidoService: PedidoService) {}

  @Get(':userId')
async getPedidosByUser(@Param('userId') userId: number) {
  return this.pedidoService.getPedidosByUser(userId);
}


  @Post(':userId/checkout')
  checkout(@Param('userId') userId: number) {
    return this.pedidoService.checkout(userId);
  }
}
