import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Products } from 'src/entities/products.entity';

@Injectable()
export class ProductsService {

  constructor(private productsRepository: ProductsRepository) { }

  getProducts(page: number, limit: number) {
    return this.productsRepository.getProducts(page, limit)
  }

  async getProductById(id: string) {
    return this.productsRepository.getProductById(id)
  }

  async addProduct() {
    return this.productsRepository.addProduct()
  }

  async updateProduct(id: string, product: Products) {
    return this.productsRepository.updateProduct(id, product)
  }

  async deleteProduct(id: string) {
    return this.productsRepository.deleteProduct(id)
  }
}
