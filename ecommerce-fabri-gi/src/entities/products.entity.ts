import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categories } from "./categories.entity";
import { OrderDetails } from "./ordersDetail.entity";

@Entity({
    name: 'products'
})

export class Products {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'varchar',
        length: 50,
        unique: true
    })
    name: string

    @Column({ type: 'text' })
    description: string

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2
    })
    price: number

    @Column({ type: 'int' })
    stock: number

    @Column({ type: 'text' })
    imgUrl: string

    @ManyToOne(() => Categories, (category) => category.products)
    @JoinColumn()
    category: Categories

    @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
    orderDetails: OrderDetails[]

}