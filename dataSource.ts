import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config'; //installed package
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('TYPEORM_HOST'),
  port: configService.get('TYPEORM_PORT'),
  username: configService.get('TYPEORM_USERNAME'),
  password: configService.get('TYPEORM_PASSWORD'),
  database: configService.get('TYPEORM_DATABASE'),
  entities: ['src/**/*.entity.ts'],
  migrations: ['migrations/**/*{.ts,.js}'],
});
