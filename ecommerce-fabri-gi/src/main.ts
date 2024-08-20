import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerGlobalMiddleware } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ProductsRepository } from './products/products.repository';
import { CategoriesRepository } from './categories/categories.repository';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const options = new DocumentBuilder()
    .setTitle('NestJs Api')
    .setDescription('Proyecto integrador modulo 4 ft50')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  app.use(LoggerGlobalMiddleware);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const categoryPreload = app.get(CategoriesRepository)
  const productPreload = app.get(ProductsRepository)

  await categoryPreload.addCategories()
  await productPreload.addProduct()
  await app.listen(3000);
}
bootstrap();
