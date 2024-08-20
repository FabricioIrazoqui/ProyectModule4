import { Injectable, NotFoundException } from '@nestjs/common';
import { Users } from 'src/entities/users.entity';
import { UserRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwTService: JwtService
  ) { }


  async signIn(email: string, password: string) {

    if (!email || !password) throw new NotFoundException('Email y password requeridos')

    const user = await this.userRepository.getUserbyEmail(email)
    if (!user) throw new NotFoundException('credenciales incorrectas')

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) throw new NotFoundException('Credenciales incorrectas')

    const payload = { id: user.id, email: user.email, isAdmin: user.isAdmin }
    const token = this.jwTService.sign(payload)

    return {
      message: 'Usuario logueado',
      token,
    }
  }

  async signUp(user: Partial<Users>) {

    const { email, password } = user

    const foundUser = await this.userRepository.getUserbyEmail(email)
    if (foundUser) throw new NotFoundException('Email registrado')

    const hashedPassword = await bcrypt.hash(password, 10)

    return await this.userRepository.addUser({ ...user, password: hashedPassword })

  }
}
