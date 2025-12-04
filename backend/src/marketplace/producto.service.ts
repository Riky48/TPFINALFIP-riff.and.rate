import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Producto } from 'src/database/entities/Producto.entity';
import { Marca } from 'src/database/entities/Marca.entity';
import { Categoria } from 'src/database/entities/Categoria.entity';
import { _user } from 'src/database/entities/_user.entity';
import { CreateProductoDto } from './dto/create-producto.dto';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,

    @InjectRepository(Marca)
    private readonly marcaRepository: Repository<Marca>,

    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,

    @InjectRepository(_user)
    private readonly userRepository: Repository<_user>,
  ) {}

  // ============================================================
  //  CREAR PRODUCTO
  // ============================================================
 async create(data: CreateProductoDto): Promise<Producto> {
  try {
    console.log('🚀 Datos recibidos para crear producto:', data);

    // Usuario (opcional)
    let user: _user | null = null;
    if (data.userId) {
      user = await this.userRepository.findOne({ where: { id: data.userId } });
      console.log('👤 Usuario encontrado:', user);
      if (!user) throw new NotFoundException(`Usuario ${data.userId} no encontrado`);
    }

    // MARCA (solo UNA)
    let marca: Marca | null = null;
    if (data.marca) {
      marca = await this.marcaRepository.findOne({ where: { nombre: data.marca } });
      console.log('🏷 Marca encontrada:', marca);
      if (!marca) {
        marca = this.marcaRepository.create({ nombre: data.marca });
        marca = await this.marcaRepository.save(marca);
        console.log('🏷 Marca creada:', marca);
      }
    }

    // CATEGORIAS (MANY TO MANY)
    const categorias: Categoria[] = [];
    if (data.categorias?.length) {
      for (const catNombre of data.categorias) {
        const nombre = catNombre.trim();
        if (!nombre) continue;

        let categoria = await this.categoriaRepository.findOne({ where: { nombre } });
        console.log('📂 Categoria encontrada:', categoria);
        if (!categoria) {
          categoria = this.categoriaRepository.create({ nombre });
          categoria = await this.categoriaRepository.save(categoria);
          console.log('📂 Categoria creada:', categoria);
        }

        categorias.push(categoria);
      }
    }

    // Crear producto
    const producto = this.productoRepository.create({
      nombre: data.nombre,
      descripcion: data.descripcion,
      precio: data.precio,
      stock: data.stock,
      img: data.img,

      marca: marca || undefined,
      categorias: categorias.length ? categorias : undefined,
      user: user || undefined,
    });

    console.log('🛠 Producto a guardar:', producto);

    const savedProducto = await this.productoRepository.save(producto);
    console.log('✅ Producto guardado:', savedProducto);

    return savedProducto;
  } catch (error) {
    console.error('❌ Error en create:', error);
    throw error;
  }
}


  // ============================================================
  // 🔄 UPDATE
  // ============================================================
  async update(id: number, data: Partial<CreateProductoDto>): Promise<Producto> {

    const producto = await this.productoRepository.findOne({
      where: { id },
      relations: ['marca', 'categorias', 'user'],
    });

    if (!producto) throw new NotFoundException(`Producto ${id} no encontrado`);

    // Campos simples
    if (data.nombre) producto.nombre = data.nombre;
    if (data.descripcion) producto.descripcion = data.descripcion;
    if (data.precio) producto.precio = data.precio;
    if (data.stock) producto.stock = data.stock;
    if (data.img) producto.img = data.img;

    // MARCA (una sola)
    if (data.marca) {
      let marca = await this.marcaRepository.findOne({ where: { nombre: data.marca } });
      if (!marca) {
        marca = this.marcaRepository.create({ nombre: data.marca });
        marca = await this.marcaRepository.save(marca);
      }
      producto.marca = marca;
    }

    // CATEGORIAS (array)
    if (data.categorias?.length) {
      const categorias: Categoria[] = [];

      for (const catNombre of data.categorias) {
        const nombre = catNombre.trim();
        if (!nombre) continue;

        let categoria = await this.categoriaRepository.findOne({ where: { nombre } });

        if (!categoria) {
          categoria = this.categoriaRepository.create({ nombre });
          categoria = await this.categoriaRepository.save(categoria);
        }

        categorias.push(categoria);
      }

      producto.categorias = categorias;
    }

    return await this.productoRepository.save(producto);
  }

  // ============================================================
  // GET TODOS
  // ============================================================
  async findAll(): Promise<Producto[]> {
    return await this.productoRepository.find({
      relations: ['marca', 'categorias', 'reviews', 'user'],
    });
  }

  // ============================================================
  // GET UNO
  // ============================================================
  async findOne(id: number): Promise<Producto> {
    const producto = await this.productoRepository.findOne({
      where: { id },
      relations: ['marca', 'categorias', 'reviews', 'user'],
    });

    if (!producto) throw new NotFoundException(`Producto ${id} no encontrado`);

    return producto;
  }

  // ============================================================
  // DELETE
  // ============================================================
  async remove(id: number): Promise<void> {
    await this.productoRepository.delete(id);
  }

  // ============================================================
  // SEARCH
  // ============================================================
  async searchByNombre(nombre: string): Promise<Producto[]> {
    return await this.productoRepository.find({
      where: { nombre: ILike(`%${nombre}%`) },
      relations: ['marca', 'categorias', 'reviews', 'user'],
    });
  }
}
