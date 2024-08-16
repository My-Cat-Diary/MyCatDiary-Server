import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiaryEntity } from './entity/diary.entity';
import { Repository } from 'typeorm';
import { CreateDiaryDTO } from './dto/diary.dto';

@Injectable()
export class DiaryRepository {
  constructor(
    @InjectRepository(DiaryEntity)
    private readonly diaryRepository: Repository<DiaryEntity>,
  ) {}

  async createDiary(
    createDiaryDTO: CreateDiaryDTO,
    userId: number,
  ): Promise<DiaryEntity> {
    const diary = this.diaryRepository.create({ ...createDiaryDTO, userId });

    await this.diaryRepository.save(diary);

    return diary;
  }

  async fetchDiaryList(userId: number): Promise<DiaryEntity[]> {
    const diaryList = await this.diaryRepository.findBy({ userId });

    return diaryList;
  }

  async fetchDiaryById(id: number, userId: number): Promise<DiaryEntity> {
    const diary = await this.diaryRepository.findOneBy({ id, userId });

    return diary;
  }
}
