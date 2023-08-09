import { Module } from '@nestjs/common';
import { UserAuthService } from './services/user-auth.service';
import { UserAuthController } from './user-auth.controller';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UserAuth } from './entities/user-auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from './constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserAuth]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7 days' },
    }),
    UserAuthModule,
  ],
  controllers: [UserAuthController],
  exports: [UserAuthService, AuthService],
  providers: [UserAuthService, AuthService, JwtStrategy, LocalStrategy],
})
export class UserAuthModule {}
