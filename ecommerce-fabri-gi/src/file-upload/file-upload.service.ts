import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
    constructor(
        private readonly fileUpdateRepository: FileUploadRepository,
        @InjectRepository(Products) private readonly productsRepository: Repository<Products>
    ) { }

    async uploadImage(productId: string, file: Express.Multer.File) {

        const product = await this.productsRepository.findOneBy({ id: productId })
        if (!product) throw new NotFoundException('Producto inexistente')

        const response = await this.fileUpdateRepository.uploadImage(file)
        if (!response.secure_url) throw new NotFoundException('Error al cargar imagen')

        const updateProduct = await this.productsRepository.update(productId, {
            imgUrl: response.secure_url
        })
        if (!updateProduct) throw new NotFoundException('Error al insertar Imagen')

        const userProduct = await this.productsRepository.findOneBy({ id: productId })

        return userProduct
    }
}
