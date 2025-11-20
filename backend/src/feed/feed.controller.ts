import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Req, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { FeedService } from './feed.service';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';
import { FeedDto } from './dto/feed.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) { }

  @UseGuards(JwtAuthGuard)
  @Post('posts/postId')
  @HttpCode(HttpStatus.CREATED)
  async createPost(
    @Body() dto: CreateFeedDto,
    @Req() req: any
  ) {
    dto.user_id = req.user.id; // JWT da el userId
    return this.feedService.createPost(dto);
  }


  @UseGuards(JwtAuthGuard)
  @Get('users/:id')
  @HttpCode(HttpStatus.OK)
  async getUseFeed(@Param('id', ParseIntPipe) id: number): Promise<FeedDto[]> {
    return this.feedService.joinFeed(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  @HttpCode(HttpStatus.OK)
  async getAllFeed(): Promise<FeedDto[]> {
    return this.feedService.joinFeed();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.feedService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFeedDto: UpdateFeedDto,
    @Req() req: any
  ) {
    return this.feedService.update(id, req.user.id, updateFeedDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('posts/:postId')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('postId', ParseIntPipe) postId: number,
    @Req() req: any) {
    return this.feedService.removePost(postId, req.user.id);
  }
}
