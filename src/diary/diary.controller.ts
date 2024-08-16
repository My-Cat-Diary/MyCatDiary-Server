import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DiaryService } from './diary.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateDiaryDTO, DiaryResDTO } from './dto/diary.dto';
import { UserEntity } from 'src/user/entity/user.entity';

@Controller('diary')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createDiary(@Req() req, @Body() createDiaryDTO: CreateDiaryDTO) {
    await this.diaryService.createDiary(createDiaryDTO, req.user as UserEntity);

    return { statusCode: 201, message: 'success create diary' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async fetchDiaryList(@Req() req): Promise<DiaryResDTO[]> {
    const diaryList = await this.diaryService.fetchDiaryList(
      req.user as UserEntity,
    );

    return diaryList;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:diary_id')
  async fetchDiaryById(
    @Req() req,
    @Param('diary_id') id: number,
  ): Promise<DiaryResDTO> {
    const diary = await this.diaryService.fetchDiaryById(
      id,
      req.user as UserEntity,
    );

    return diary;
  }
}
