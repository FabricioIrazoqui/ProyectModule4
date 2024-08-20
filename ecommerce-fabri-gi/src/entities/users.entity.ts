import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "./orders.entity";

@Entity({
    name: 'users'
})

export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'varchar',
        length: 50
    })
    name: string

    @Column({
        type: 'varchar',
        length: 50,
        unique: true
    })
    email: string

    @Column({
        type: 'varchar',
        length: 200,
    })
    password: string

    @Column({
        type: 'int'
    })
    phone: number

    @Column({
        type: 'varchar',
        length: 50,
    })
    country: string

    @Column({
        type: 'text'
    })
    address: string

    @Column({
        type: 'varchar',
        length: 50,
    })
    city: string

    @Column({ default: false })
    isAdmin: boolean

    @OneToMany(() => Orders, (order) => order.user)
    @JoinColumn({ name: 'order_id' })
    orders: Orders[]
}
