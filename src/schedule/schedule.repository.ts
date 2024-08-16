import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleEntity } from './entity/schedule.entity';
import { Repository } from 'typeorm';
import { CreateScheduleDTO } from './dto/schedule.dto';
import { UserEntity } from 'src/user/entity/user.entity';

@Injectable()
export class ScheduleRepository {
  constructor(
    @InjectRepository(ScheduleEntity)
    private readonly scheduleRepository: Repository<ScheduleEntity>,
  ) {}

  async createScheduel(
    createScheduleDTO: CreateScheduleDTO,
    user: UserEntity,
  ): Promise<ScheduleEntity> {
    const schedule = this.scheduleRepository.create({
      ...createScheduleDTO,
      userId: user.userId,
      catId: createScheduleDTO.cat_id,
    });

    await this.scheduleRepository.save(schedule);

    return schedule;
  }

  async fetchScheduleList(user: UserEntity): Promise<ScheduleEntity[]> {
    const scheduleList = await this.scheduleRepository.findBy({
      userId: user.userId,
    });

    return scheduleList;
  }

  async fetchScheduleById(
    id: number,
    user: UserEntity,
  ): Promise<ScheduleEntity> {
    const schedule = await this.scheduleRepository.findOneBy({
      id,
      userId: user.userId,
    });

    return schedule;
  }
}
