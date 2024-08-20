import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { Users } from 'src/entities/users.entity';
import { CreateUserDto } from './users.dto';

@Injectable()
export class UsersService {

  constructor(private usersRepository: UserRepository) { }

  getUsers(page: number, limit: number) {
    return this.usersRepository.getUsers(page, limit)
  }

  getUserById(id: string) {
    return this.usersRepository.getUserById(id)
  }

  addUser(user: Partial<Users>) {
    return this.usersRepository.addUser(user)
  }

  updateUser(id: string, user: CreateUserDto) {
    return this.usersRepository.updateUser(id, user)
  }

  deleteUser(id: string) {
    return this.usersRepository.deleteUser(id)
  }
}
