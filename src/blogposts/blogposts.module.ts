import { Module } from '@nestjs/common';
import { BlogpostsService } from './blogposts.service';
import { BlogpostsController } from './blogposts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blogpost } from './entities/blogpost.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blogpost])],
  controllers: [BlogpostsController],
  providers: [BlogpostsService],
})
export class BlogpostsModule {}
