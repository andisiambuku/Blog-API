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
    currentUser: string,
  ): Promise<Blogpost> {
    const blogPost = await this.blogpostRepository.create({
      ...createBlogpostDto,
      user: { id: currentUser },
    });
    return this.blogpostRepository.save(blogPost);
  }

  findAll(currentUser: string): Promise<Blogpost[]> {
    return this.blogpostRepository.find({
      where: { user: { id: currentUser } },
    });
  }

  findOne(id: string, currentUser: string): Promise<Blogpost> {
    return this.blogpostRepository.findOne({ where: { id: currentUser } });
  }

  async update(
    id: string,
    updateBlogpostDto: UpdateBlogpostDto,
    currentUser: string,
  ) {
    const blogPost = await this.findOne(id, currentUser);
    this.blogpostRepository.merge(blogPost, updateBlogpostDto);
    return this.blogpostRepository.save(blogPost);
  }

  async remove(id: string): Promise<void> {
    await this.blogpostRepository.delete(id);
  }
}
