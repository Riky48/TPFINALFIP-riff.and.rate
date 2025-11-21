import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Pedido } from '../entities/Pedido.entity';
import { PedidoProducto } from '../entities/PedidoProducto.entity';
import { Carrito } from '../entities/Carrito.entity';
import { CarritoProducto } from '../entities/CarritoProducto.entity';
import { _user } from 'src/database/entities/_user.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido) private pedidoRepo: Repository<Pedido>,
    @InjectRepository(PedidoProducto) private pedidoProductoRepo: Repository<PedidoProducto>,
    @InjectRepository(Carrito) private carritoRepo: Repository<Carrito>,
    @InjectRepository(CarritoProducto) private carritoProductoRepo: Repository<CarritoProducto>,
    @InjectRepository(_user) private userRepo: Repository<_user>,
  ) {}

  async checkout(userId: number) {
    // 1) Usuario
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new Error('Usuario no encontrado');

    // 2) Carrito del usuario
    const carrito = await this.carritoRepo.findOne({
      where: { user: { id: userId } },
      relations: ['productos', 'productos.producto'],
    });

    if (!carrito || carrito.productos.length === 0) {
      throw new Error('El carrito está vacío');
    }

    // 3) Crear el pedido
    const pedido = this.pedidoRepo.create({
      usuario: user,
      estado: 'pendiente',
    });

    const pedidoGuardado = await this.pedidoRepo.save(pedido);

    // 4) Pasar productos del carrito al pedido
    let total = 0;

    for (const cp of carrito.productos) {
      const pedidoProd = this.pedidoProductoRepo.create({
        pedido: pedidoGuardado,
        producto: cp.producto,
        cantidad: cp.cantidad,
        precio: cp.producto.precio,
      });

      total += Number(cp.producto.precio) * cp.cantidad;

      await this.pedidoProductoRepo.save(pedidoProd);
    }

    // 5) Actualizar total del pedido
    pedidoGuardado.estado = 'pagado';
    await this.pedidoRepo.save(pedidoGuardado);

    // 6) Vaciar carrito
    await this.carritoProductoRepo.delete({ carrito: { id: carrito.id } });
    carrito.total = 0;
    await this.carritoRepo.save(carrito);

    // 7) Devolver el pedido completo
    return this.pedidoRepo.findOne({
      where: { id: pedidoGuardado.id },
      relations: ['pedidoProductos', 'pedidoProductos.producto'],
    });
  }

  async getPedidosByUser(userId: number) {
  return this.pedidoRepo.find({
    where: { usuario: { id: userId } },
    relations: ['pedidoProductos', 'pedidoProductos.producto', 'pago', 'Factura'],
    order: { fechaCreacion: 'DESC' }
  });
}

}
