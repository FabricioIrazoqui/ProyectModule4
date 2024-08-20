import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.services';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decoreitors/roles.decoreitor';
import { Role } from 'src/enum/roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Products } from 'src/entities/products.entity';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) { }


  @Get()
  getProducts(@Query('page') page: string, @Query('limit') limit: string) {
    return this.productService.getProducts(Number(page), Number(limit))
  }

  @Get(':id')
  getProductById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.getProductById(id)
  }

  @Get()
  addProduct() {
    return this.productService.addProduct()
  }

  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateProduct(@Param('id') id: string, @Body() product: Products) {
    return this.productService.updateProduct(id, product)
  }

  @ApiBearerAuth()
  @Delete()
  @UseGuards(AuthGuard)
  deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.deleteProduct(id)
  }
}
