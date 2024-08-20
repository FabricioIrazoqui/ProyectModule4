import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetails } from "./ordersDetail.entity";
import { Users } from "./users.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'orders' })
export class Orders {
    @ApiProperty({ description: 'Uuid v4 generado por la BBDD' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ description: 'debe ingresar una fecha con formato dd/mm/yy', example: '01/01/1995' })
    @Column()
    date: Date;

    @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.order)
    orderDetails: OrderDetails[];

    @ManyToOne(() => Users, (user) => user.orders)
    @JoinColumn({ name: 'user_id' })
    user: Users;
}
