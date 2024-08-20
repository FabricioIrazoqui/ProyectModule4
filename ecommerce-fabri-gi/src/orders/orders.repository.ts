import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Orders } from "src/entities/orders.entity";
import { OrderDetails } from "src/entities/ordersDetail.entity";
import { Products } from "src/entities/products.entity";
import { Users } from "src/entities/users.entity";
import { DataSource, Repository } from "typeorm";
import { CreateOrderDto } from "./order.dto";

@Injectable()
export class OrderRepository {
    constructor(
        @InjectRepository(Orders)
        private readonly orderRepository: Repository<Orders>,
        @InjectRepository(OrderDetails)
        private readonly orderDetailsRepository: Repository<OrderDetails>,
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
        @InjectRepository(Products)
        private readonly productsRepository: Repository<Products>,
        private readonly dataSource: DataSource
    ) { }

    async addOrder(orders: CreateOrderDto) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            let total = 0;

            const user = await queryRunner.manager.findOne(this.usersRepository.target, { where: { id: orders.userId } });
            if (!user) throw new NotFoundException(`Usuario con id ${orders.userId} inexistente`);

            const order = new Orders();
            order.date = new Date();
            order.user = user;

            const newOrder = await queryRunner.manager.save(order);

            const productsArray = await Promise.all(
                orders.products.map(async (element) => {
                    const product = await queryRunner.manager.findOne(this.productsRepository.target, { where: { id: element.id } });
                    if (!product) throw new NotFoundException(`Producto con id ${element.id} inexistente`);

                    total += Number(product.price);

                    await queryRunner.manager.update(this.productsRepository.target, { id: element.id }, { stock: product.stock - 1 });

                    return product;
                })
            );

            const orderDetail = new OrderDetails();

            orderDetail.price = Number(Number(total).toFixed(2));
            orderDetail.products = productsArray;
            orderDetail.order = newOrder;

            await queryRunner.manager.save(orderDetail)

            await queryRunner.commitTransaction();

            return await this.orderRepository.find({
                where: { id: order.id },
                relations: {
                    orderDetails: true
                }
            });
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async getOrder(id: string) {
        const order = await this.orderRepository.find({
            where: { id },
            relations: {
                orderDetails: { products: true }
            }
        });

        if (!order) throw new NotFoundException(`Orden con id ${id} inexistente`);
        return order;
    }
}
