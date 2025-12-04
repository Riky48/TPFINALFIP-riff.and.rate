import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Req, HttpCode, HttpStatus, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FeedService } from './feed.service';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';
import { FeedDto } from './dto/feed.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { _multimedia } from 'src/database/entities/_multimedia.entity';
import { Repository } from 'typeorm';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService,
    @InjectRepository(_multimedia)
    private readonly multimediaRepository: Repository<_multimedia>,
  ) { }

  @Post('posts')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('files'))
  async createPost(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: any,
    @Req() req: any
  ) {
    const dto = new CreateFeedDto();
    dto.title = body.title;
    dto.content = body.content;
    dto.user_id = req.user.id;
    dto.type = body.type;

    // Guardar archivos:
    const multimediaIds: number[] = [];

    if (files?.length > 0) {
      for (const file of files) {
        const media = await this.multimediaRepository.save({
          src: file.path,
          title: file.originalname,
          type: file.mimetype.startsWith("image")
            ? "image"
            : file.mimetype.startsWith("video")
              ? "video"
              : "file",
          id: req.user.id,
        });

        multimediaIds.push(media.id_multimedia);
      }
    }
    dto.multimediaIds = multimediaIds;
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
