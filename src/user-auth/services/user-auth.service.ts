import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAuth } from '../entities/user-auth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserAuthService {
  constructor(
    @InjectRepository(UserAuth)
    private userauthRepository: Repository<UserAuth>,
  ) {}

  async createUser(
    username: string,
    email: string,
    password: string,
  ): Promise<UserAuth> {
    const newUser = this.userauthRepository.create({
      username,
      email,
      password,
    });
    return this.userauthRepository.save(newUser);
  }

  async findByEmail(email: string): Promise<UserAuth | undefined> {
    return this.userauthRepository.findOne({ where: { email } });
  }

  async findByUsername(username: string): Promise<UserAuth | undefined> {
    return this.userauthRepository.findOne({ where: { username } });
  }

  async remove(id: string): Promise<void> {
    await this.userauthRepository.delete(id);
  }
}
