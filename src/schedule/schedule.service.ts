import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ScheduleRepository } from './schedule.repository';
import { CreateScheduleDTO, ScheduleResDTO } from './dto/schedule.dto';
import { UserEntity } from 'src/user/entity/user.entity';
import { CatRepository } from 'src/cat/cat.repository';
import { CatResDTO } from 'src/cat/dto/cat.dto';

@Injectable()
export class ScheduleService {
  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly catRepository: CatRepository,
  ) {}

  async createSchedule(
    createScheduleDTO: CreateScheduleDTO,
    user: UserEntity,
  ): Promise<void> {
    const schedule = await this.scheduleRepository.createScheduel(
      createScheduleDTO,
      user,
    );

    if (!schedule) throw new BadRequestException();
  }

  async fetchScheduleList(user: UserEntity): Promise<ScheduleResDTO[]> {
    const scheduleList = await this.scheduleRepository.fetchScheduleList(user);

    const scheduleWithCatList = await Promise.all(
      scheduleList.map(async (schedule) => {
        const { id, name, age, sex, birthDay } =
          await this.catRepository.getCatById(schedule.catId);

        return {
          id: schedule.id,
          image_urls: schedule.imageUrls,
          title: schedule.title,
          content: schedule.content,
          day: schedule.day,
          cat: { cat_id: id, name, age, sex, birth_day: birthDay } as CatResDTO,
        };
      }),
    );

    return scheduleWithCatList;
  }

  async fetchScheduleById(
    id: number,
    user: UserEntity,
  ): Promise<ScheduleResDTO> {
    const schedule = await this.scheduleRepository.fetchScheduleById(id, user);
    const cat = await this.catRepository.getCatById(schedule.catId);

    if (!schedule) throw new NotFoundException();

    return {
      id: schedule.id,
      image_urls: schedule.imageUrls,
      title: schedule.title,
      content: schedule.content,
      day: schedule.day,
      cat: {
        cat_id: cat.id,
        name: cat.name,
        age: cat.age,
        sex: cat.sex,
        birth_day: cat.birthDay,
        image_url: cat.imageUrl,
      },
    };
  }
}
