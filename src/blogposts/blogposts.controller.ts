import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { BlogpostsService } from './blogposts.service';
import { CreateBlogpostDto } from './dto/create-blogpost.dto';
import { UpdateBlogpostDto } from './dto/update-blogpost.dto';
import { Blogpost } from './entities/blogpost.entity';

@Controller('blogposts')
export class BlogpostsController {
  constructor(private readonly blogpostsService: BlogpostsService) {}

  @Post()
  async create(
    @Body() createBlogpostDto: CreateBlogpostDto,
    @Request() req: any,
  ): Promise<Blogpost> {
    const currentUser = req.user.id;
    console.log(currentUser);
    const blogPost = await this.blogpostsService.findOne(
      createBlogpostDto.body,
      createBlogpostDto.title,
    );
    if (blogPost) {
      throw new BadRequestException('Blogpost already exists');
    }
    return this.blogpostsService.create(createBlogpostDto, currentUser);
  }

  @Get()
  async findAll(@Request() req: any): Promise<Blogpost[]> {
    const currentUser = req.user.id;
    return this.blogpostsService.findAll(currentUser);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Request() req: any,
  ): Promise<Blogpost> {
    const currentUser = req.user.id;
    const blogPost = await this.blogpostsService.findOne(id, currentUser);
    if (!blogPost) {
      throw new NotFoundException('This blogpost does not exist');
    }
    return blogPost;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBlogpostDto: UpdateBlogpostDto,
    @Request() req: any,
  ): Promise<Blogpost> {
    const currentUser = req.user.id;
    const blogPost = await this.blogpostsService.findOne(id, currentUser);
    if (blogPost.user.id != currentUser) {
      throw new UnauthorizedException(
        'You are not authorized to update this template',
      );
    }
    return this.blogpostsService.update(id, updateBlogpostDto, currentUser);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req: any): Promise<void> {
    const currentUser = req.user.id;
    const blogPost = await this.blogpostsService.findOne(id, currentUser);
    if (!blogPost) {
      throw new NotFoundException('The blogpost does not exist!');
    }
    if (blogPost.user.id != currentUser) {
      throw new UnauthorizedException(
        'You are not authorized to delete this template',
      );
    }
    return this.blogpostsService.remove(id);
  }
}
