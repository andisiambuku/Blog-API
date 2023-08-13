import { Injectable } from '@nestjs/common';
import { CreateBlogpostDto } from './dto/create-blogpost.dto';
import { UpdateBlogpostDto } from './dto/update-blogpost.dto';
import { Blogpost } from './entities/blogpost.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BlogpostsService {
  constructor(
    @InjectRepository(Blogpost)
    private readonly blogpostRepository: Repository<Blogpost>,
  ) {}

  async create(
    createBlogpostDto: CreateBlogpostDto,
    userId: string,
  ): Promise<Blogpost> {
    const blogPost = this.blogpostRepository.create({
      ...createBlogpostDto,
      user: { id: userId },
    });
    return this.blogpostRepository.save(blogPost);
  }

  findAll(userId: string): Promise<Blogpost[]> {
    return this.blogpostRepository.find({
      where: { user: { id: userId } },
    });
  }

  async findOneByTitle(title: string): Promise<Blogpost> {
    return this.blogpostRepository.findOne({ where: { title } });
  }

  async findOne(id: string, userId: string): Promise<Blogpost> {
    return this.blogpostRepository.findOne({
      where: { id, user: { id: userId } },
    });
  }

  async update(
    id: string,
    updateBlogpostDto: UpdateBlogpostDto,
    userId: string,
  ) {
    const blogPost = await this.findOne(id, userId);
    this.blogpostRepository.merge(blogPost, updateBlogpostDto);
    return this.blogpostRepository.save(blogPost);
  }

  async remove(id: string): Promise<void> {
    await this.blogpostRepository.delete(id);
  }
}
