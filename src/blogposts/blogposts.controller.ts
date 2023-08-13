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
  UseGuards,
} from '@nestjs/common';
import { BlogpostsService } from './blogposts.service';
import { CreateBlogpostDto } from './dto/create-blogpost.dto';
import { UpdateBlogpostDto } from './dto/update-blogpost.dto';
import { Blogpost } from './entities/blogpost.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('blogposts')
@UseGuards(AuthGuard('jwt'))
export class BlogpostsController {
  constructor(private readonly blogpostsService: BlogpostsService) {}

  @Post()
  async create(
    @Body() createBlogpostDto: CreateBlogpostDto,
    @Request() req: any,
  ): Promise<Blogpost> {
    const userId = req.user.id;
    const blogPostWithTitle = await this.blogpostsService.findOneByTitle(
      createBlogpostDto.title,
    );
    if (blogPostWithTitle) {
      throw new BadRequestException(
        'Blogpost with the same title already exists',
      );
    }
    return this.blogpostsService.create(createBlogpostDto, userId);
  }

  @Get()
  async findAll(@Request() req: any): Promise<Blogpost[]> {
    const userId = req.user.id;
    return this.blogpostsService.findAll(userId);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Request() req: any,
  ): Promise<Blogpost> {
    const userId = req.user.id;
    const blogPost = await this.blogpostsService.findOne(id, userId);
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
    const userId = req.user.id;
    const blogPost = await this.blogpostsService.findOne(id, userId);
    if (blogPost.user.id != userId) {
      throw new UnauthorizedException(
        'You are not authorized to update this template',
      );
    }
    return this.blogpostsService.update(id, updateBlogpostDto, userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req: any): Promise<void> {
    const userId = req.user.id;
    const blogPost = await this.blogpostsService.findOne(id, userId);
    if (!blogPost) {
      throw new NotFoundException('The blogpost does not exist!');
    }
    if (blogPost.user.id != userId) {
      throw new UnauthorizedException(
        'You are not authorized to delete this template',
      );
    }
    return this.blogpostsService.remove(id);
  }
}
