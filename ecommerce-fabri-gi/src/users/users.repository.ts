import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/entities/users.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./users.dto";


@Injectable()
export class UserRepository {
    constructor(@InjectRepository(Users) private readonly userRepository: Repository<Users>) { }

    async getUsers(page: number, limit: number) {
        const skip = (page - 1) * limit
        const users = await this.userRepository.find({
            take: limit,
            skip: skip
        })

        return users.map(({ password, ...userNoPassword }) => userNoPassword)
    }

    async getUserById(id: string) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: {
                orders: true
            }
        })
        if (!user) throw new NotFoundException(`Usuario con id ${id} inexistente`)
        const { password, isAdmin, ...userNoInfo } = user
        return userNoInfo
    }

    async addUser(user: Partial<Users>) {
        const newUser = await this.userRepository.save(user)
        const dbUser = await this.userRepository.findOneBy({ id: newUser.id })
        const { password, isAdmin, ...userNoInfo } = dbUser
        return userNoInfo
    }

    async updateUser(id: string, user: CreateUserDto) {
        await this.userRepository.update(id, user)
        const updateUser = await this.userRepository.findOneBy({ id })
        const { password, isAdmin, ...userNoInfo } = updateUser
        return userNoInfo
    }

    async deleteUser(id: string) {
        const user = await this.userRepository.findOneBy({ id })
        this.userRepository.remove(user)
        const { password, isAdmin, ...userNoInfo } = user
        return userNoInfo
    }

    async getUserbyEmail(email: string) {
        return await this.userRepository.findOneBy({ email })
    }
}