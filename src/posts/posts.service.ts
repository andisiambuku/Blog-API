import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogPost } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(BlogPost)
    private readonly postRepository: Repository<BlogPost>,
  ) {}
  async create(
    createPostDto: CreatePostDto,
    userId: number,
  ): Promise<BlogPost> {
    const post = await this.postRepository.create({
      ...createPostDto,
      userauth: { id: userId },
    });
    return this.postRepository.save(post);
  }

  async findAll(userId: number): Promise<BlogPost[]> {
    return this.postRepository.find({
      where: { userauth: { id: userId } },
    });
  }

  async findOne(id: number, userId: number): Promise<BlogPost> {
    return await this.postRepository.findOne({
      where: { id: id, userauth: { id: userId } },
    });
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
    userId: number,
  ): Promise<BlogPost> {
    const post = await this.findOne(id, userId);
    this.postRepository.merge(post, updatePostDto);
    return this.postRepository.save(post);
  }

  async remove(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}
