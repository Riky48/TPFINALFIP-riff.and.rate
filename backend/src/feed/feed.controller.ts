import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { FeedService } from './feed.service';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';
import { FeedDto } from './dto/feed.dto';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPost(@Body() createFeedDto: CreateFeedDto): Promise<FeedDto[]> {
     return this.feedService.createPost(createFeedDto);
  }

  @Get('users/:id')
  @HttpCode(HttpStatus.OK)
  async getUseFeed(@Param('id', ParseIntPipe) id: number): Promise<FeedDto[]> {
    return this.feedService.joinFeed(id);
  }

  @Get('users')
  @HttpCode(HttpStatus.OK)
  async getAllFeed(): Promise<FeedDto[]> {
    return this.feedService.joinFeed();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.feedService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFeedDto: UpdateFeedDto,
    // @Req() req: any 
  ) {
    return this.feedService.update(id, updateFeedDto.id_user, updateFeedDto);
  }


  @Delete('posts/:postId')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('postId', ParseIntPipe) postId: number,
    @Body('userId') userId: number) {
    return this.feedService.removePost(postId, userId);
  }
}
