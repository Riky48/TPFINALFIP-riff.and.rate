// src/marketplace/pedido/pedido.controller.ts
import { Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('pedido')
export class PedidoController {
  constructor(private pedidoService: PedidoService) {}

  // Obtener pedidos del usuario logueado
  @Get()
  async getPedidosByUser(@Request() req) {
    const userId = req.user.id;
    return this.pedidoService.getPedidosByUser(userId);
  }

  // Checkout sin pasar userId por params
  @Post('checkout')
  async checkout(@Request() req) {
    const userId = req.user.id;
    return this.pedidoService.checkout(userId);
  }
}
