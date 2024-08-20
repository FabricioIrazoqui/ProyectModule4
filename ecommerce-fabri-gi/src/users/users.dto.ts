import { PartialType } from "@nestjs/mapped-types";
import { ApiHideProperty, PickType } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength, Validate } from "class-validator";
import { MatchPassword } from "src/decoreitors/matchPassword.decoreitors";

export class CreateUserDto {

    @ApiHideProperty()
    @IsOptional()
    id: string

    /**
     * Debe ser un string entre 3 y 80 caracteres
     * @example 'Test user01'
     */
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    name: string

    /**
     * Debe ser un email
     * @example 'user01@example.com'
     */
    @IsNotEmpty()
    @IsEmail()
    email: string

    /**
     * Debe ser un string entre 8 y 15 caracteres. Incluir al menos una letra minuscula, una mayuscula, un numero y un caracter especial 
     * @example 'aaCC33##'
     */
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(15)
    @IsStrongPassword()
    password: string

    /**
     * Debe coincidir con el password
     * @example 'aaCC33##'
     */
    @IsNotEmpty()
    @Validate(MatchPassword, ['password'])
    confirmPassword: string

    /**
     * Debe ser un string entre 3 y 80 caracteres
     * @example 'street 01'
     */
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    address: string

    /**
     * Debe ser un number
     * @example '123456789'
     */
    @IsNotEmpty()
    @IsNumber()
    phone: number

    /**
     * Debe ser un string entre 4 y 20 caracteres
     * @example 'Test country'
     */
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    country: string

    /**
     * Debe ser un string entre 5 y 20 caracteres
     * @example 'Test city'
     */
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    city: string

    @ApiHideProperty()
    @IsEmpty()
    isAdmin?: boolean
}

export class UpdateUserDto extends PartialType(CreateUserDto) { }

export class LogginUserDto extends PickType(CreateUserDto, ['email', 'password']) { }