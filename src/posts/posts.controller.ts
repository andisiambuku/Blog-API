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
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { BlogPost } from './entities/post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto, @Request() req: any) {
    const userId = req.userauth.id;
    const blogpost = await this.postsService.create(createPostDto, userId);
    if (blogpost) {
      throw new BadRequestException('Blogpost already exists');
    }

    return this.postsService.create(createPostDto, userId);
  }

  @Get()
  findAll(@Request() req: any): Promise<BlogPost[]> {
    const userId = req.userauth.id;
    return this.postsService.findAll(userId);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number,
    @Request() req: any,
  ): Promise<BlogPost> {
    const userId = req.userauth.id;
    const blogpost = await this.postsService.findOne(id, userId);
    if (!blogpost) {
      throw new NotFoundException('Blogpost does not exist');
    }
    return blogpost;
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePostDto: UpdatePostDto,
    @Request() req: any,
  ): Promise<BlogPost> {
    const userId = req.userauth.id;
    const blogpost = await this.postsService.findOne(id, userId);
    if (blogpost.userauth.id != userId) {
      throw new UnauthorizedException(
        'You are not authorized to update this blogpost',
      );
    }
    return this.postsService.update(id, updatePostDto, userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req: any): Promise<void> {
    const userId = req.userauth.id;
    const blogpost = await this.postsService.findOne(id, userId);
    if (!blogpost) {
      throw new NotFoundException('Blogpost does not exist');
    }
    if (blogpost.userauth.id != userId) {
      throw new UnauthorizedException(
        'You are not authorized to delete this blogpost',
      );
    }
    return this.postsService.remove(id);
  }
}
