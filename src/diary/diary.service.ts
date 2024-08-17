import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DiaryRepository } from './diary.repository';
import { CreateDiaryDTO, DiaryResDTO } from './dto/diary.dto';
import { UserEntity } from 'src/user/entity/user.entity';

@Injectable()
export class DiaryService {
  constructor(private readonly diaryRepository: DiaryRepository) {}

  async createDiary(
    createDiary: CreateDiaryDTO,
    user: UserEntity,
  ): Promise<void> {
    const diary = await this.diaryRepository.createDiary(
      createDiary,
      user.userId,
    );

    if (!diary) throw new BadRequestException();
  }

  async fetchDiaryList(user: UserEntity): Promise<DiaryResDTO[]> {
    const diaryList = await this.diaryRepository.fetchDiaryList(user.userId);

    return diaryList.map((diary) => ({
      id: diary.id,
      title: diary.title,
      content: diary.content,
      image_urls: diary.imageUrls,
      day: diary.day,
    }));
  }

  async fetchDiaryById(id: number, user: UserEntity): Promise<DiaryResDTO> {
    const diary = await this.diaryRepository.fetchDiaryById(id, user.userId);

    if (!diary) throw new NotFoundException();

    return {
      id: diary.id,
      title: diary.title,
      content: diary.content,
      image_urls: diary.imageUrls,
      day: diary.day,
    };
  }
}
