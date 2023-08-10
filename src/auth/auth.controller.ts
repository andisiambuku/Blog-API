import { Body, Controller, Post, Put } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { SignupDto } from './dto/signup.dto';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { UserJwtResponse } from './interfaces/user-jwt.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto): Promise<User> {
    return this.authService.signUp(signupDto);
  }

  @Put('login')
  async login(@Body() loginDto: LoginDto): Promise<UserJwtResponse> {
    return this.authService.login(loginDto);
  }
}
