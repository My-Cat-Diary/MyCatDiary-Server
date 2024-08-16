import { Module } from '@nestjs/common';
import { DiaryController } from './diary.controller';
import { DiaryService } from './diary.service';
import { DiaryRepository } from './diary.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiaryEntity } from './entity/diary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiaryEntity])],
  controllers: [DiaryController],
  providers: [DiaryService, DiaryRepository],
})
export class DiaryModule {}
