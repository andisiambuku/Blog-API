import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import { ExpressAdapter } from '@nestjs/platform-express';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter());
  app.use(helmet());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
