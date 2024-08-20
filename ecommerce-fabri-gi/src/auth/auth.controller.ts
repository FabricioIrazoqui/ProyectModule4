import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LogginUserDto } from 'src/users/users.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly autservice: AuthService) { }



  @Post('signin')
  signIn(@Body() credentials: LogginUserDto) {
    const { email, password } = credentials
    return this.autservice.signIn(email, password)
  }

  @Post('signup')
  addUser(@Body() user: CreateUserDto) {
    return this.autservice.signUp(user)
  }
}
