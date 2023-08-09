import {
  Controller,
  Post,
  Put,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { JwtAuthGuard } from '././guards/jwt-auth.guard';
import { RegistrationDto } from './dto/registration.dto';

@Controller('user-auth')
export class UserAuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('signup')
  // async signup(@Request() req) {
  //   return this.authService.signup(req.body);
  // }
  @Post('signup')
  async signup(@Body() registartionDto: RegistrationDto) {
    return this.authService.register(
      registartionDto.username,
      registartionDto.email,
      registartionDto.password,
    );
  }
  // @Put('login')
  // @UseGuards(JwtAuthGuard)
  // async login(@Body() user: any) {
  //   return this.authService.login(user);
  // }

  @Put('login')
  @UseGuards(JwtAuthGuard)
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }
}
