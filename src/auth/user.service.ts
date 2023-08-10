import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/loginResponse.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(signupDto: SignupDto): Promise<User> {
    const { email, password, username } = signupDto;
    const user = new User();

    user.salt = await bcrypt.genSalt();
    user.email = email;
    user.password = await this.hashPassword(password, user.salt);
    user.username = username;

    try {
      await user.save();
      return user;
    } catch (error) {
      throw error; // TODO handle error when user already exists
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async signIn(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (user && user.validatePassword(password)) {
      const userResponse = new LoginResponseDto();

      userResponse.username = user.username;
      userResponse.email = user.email;
      return userResponse;
    } else {
      return null;
    }
  }
}
