import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { BlogPost } from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BlogPost]), PostsModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
