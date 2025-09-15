import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { FeedService } from './feed.service';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';
import { FeedDto } from './dto/feed.dto';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) { }

  @Post()
  async createPost(@Body() createFeedDto: CreateFeedDto):Promise<FeedDto[]> {
    await this.feedService.createPost(createFeedDto);
    return this.feedService.joinFeed(createFeedDto.profile_id);
  }

  @Get('users/:id')
  async getUseFeed(@Param('id', ParseIntPipe) id: number): Promise<FeedDto[]> {
    return this.feedService.joinFeed(id);
  }

  @Get('users')
  async getAllFeed(): Promise<FeedDto[]> {
    return this.feedService.joinFeed();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeedDto: UpdateFeedDto) {
    return this.feedService.update(+id, updateFeedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedService.remove(+id);
  }
}
