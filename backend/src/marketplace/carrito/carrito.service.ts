import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carrito } from 'src/database/entities/Carrito.entity';
import { CarritoProducto } from 'src/database/entities/CarritoProducto.entity';
import { Producto } from 'src/database/entities/Producto.entity';
import { AddProductDto } from './dto/add-product.dto';


@Injectable()
export class CarritoService {
  constructor(
    @InjectRepository(Carrito) private carritoRepo: Repository<Carrito>,
    @InjectRepository(CarritoProducto) private cpRepo: Repository<CarritoProducto>,
    @InjectRepository(Producto) private productoRepo: Repository<Producto>,
  ) {}

  async createCarrito(userId: number): Promise<Carrito> {
    const nuevo = this.carritoRepo.create({
      user: { id: userId } as any,
      productos: [],
      total: 0,
    });

    return await this.carritoRepo.save(nuevo);
  }

  async getCarritoByUser(userId: number): Promise<Carrito> {
    let carrito = await this.carritoRepo.findOne({
      where: { user: { id: userId } },
      relations: ['productos', 'productos.producto'],
    });

    if (!carrito) {
      carrito = await this.createCarrito(userId);
    }

    return carrito;
  }

  async addProducto(userId: number, productoId: number, cantidad: number) {
  const carrito = await this.getCarritoByUser(userId);
  const producto = await this.productoRepo.findOne({ where: { id: productoId } });

  if (!producto) {
    throw new Error('Producto no encontrado');
  }

  // Buscar si ya existe el producto en el carrito
  let item = carrito.productos.find(
    (p) => p.producto.id === productoId,
  );

  if (item) {
    // Si ya existe, sumo cantidad
    item.cantidad += cantidad;
    await this.cpRepo.save(item);
  } else {
    // Si no existe, creo la relacion
    item = this.cpRepo.create({
      carrito,
      producto,
      cantidad,
    });

    carrito.productos.push(item);
    await this.cpRepo.save(item);
  }

  // Recalcular total
  carrito.total = carrito.productos.reduce(
    (sum, p) => sum + p.cantidad * Number(p.producto.precio),
    0,
  );

  return this.carritoRepo.save(carrito);
}


  async removeProducto(userId: number, productoId: number) {
    const carrito = await this.getCarritoByUser(userId);
    carrito.productos = carrito.productos.filter(p => p.producto.id !== productoId);
    carrito.total = this.calculateTotal(carrito);

    return this.carritoRepo.save(carrito);
  }

  async clearCarrito(userId: number): Promise<void> {
  const carrito = await this.getCarritoByUser(userId);

  // Primero borro las relaciones en la tabla intermedia
  await this.cpRepo.delete({ carrito: { id: carrito.id } });

  // Luego dejo el carrito limpio
  carrito.productos = [];
  carrito.total = 0;

  await this.carritoRepo.save(carrito);
}


  private calculateTotal(carrito: Carrito): number {
    return carrito.productos.reduce(
      (sum, item) => sum + Number(item.producto.precio) * item.cantidad,
      0,
    );
  }

  // DTO version (opcional si en el front usás esto)
  async addProduct(userId: number, data: AddProductDto): Promise<Carrito> {
  return this.addProducto(userId, data.productoId, data.cantidad);
}

}
