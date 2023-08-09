import { UserAuthService } from '../services/user-auth.service';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserAuth } from '../entities/user-auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userAuthService: UserAuthService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserAuth | null> {
    const user = await this.userAuthService.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: UserAuth) {
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  // async signup(user: UserAuth): Promise<any> {
  //   // Hash the password before storing it
  //   // user.password = await bcrypt.hash(user.password, 10);
  //   const hashedPassword = bcrypt.hashSync(user.password, 10);
  //   const newUser = await this.userAuthService.createUser(
  //     hashedPassword,
  //     user.email,
  //     user.username,
  //   );
  //   return this.login(newUser);
  // }

  async register(username: string, email: string, password: string) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await this.userAuthService.createUser(
      username,
      email,
      hashedPassword,
    );
    return this.login(newUser);
  }
}
