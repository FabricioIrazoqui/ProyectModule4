import { ApiProperty } from "@nestjs/swagger"
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from "class-validator"
import { Products } from "src/entities/products.entity"

export class CreateOrderDto {

    /**
     * Debe ser un UUID del usuario
     * @example '550e8400-e29b-41d4-a716-446655440000'
     */
    @IsUUID()
    @IsNotEmpty()
    userId: string

    @ApiProperty({
        description: 'Array de productos incluidos en la orden, debe contener al menos un producto',
        example: [{ id: '550e8400-e29b-41d4-a716-446655440000', name: 'Product 1' }],
        type: [Products],
    })
    @IsArray()
    @ArrayMinSize(1)
    products: Partial<Products[]>
}