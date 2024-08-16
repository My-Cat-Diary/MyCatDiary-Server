import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleRepository } from './schedule.repository';
import { ScheduleController } from './schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleEntity } from './entity/schedule.entity';
import { CatRepository } from 'src/cat/cat.repository';
import { CatEntity } from 'src/cat/entity/cat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleEntity, CatEntity])],
  controllers: [ScheduleController],
  providers: [ScheduleService, ScheduleRepository, CatRepository],
})
export class ScheduleModule {}
