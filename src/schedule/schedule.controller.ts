import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateScheduleDTO, ScheduleResDTO } from './dto/schedule.dto';
import { UserEntity } from 'src/user/entity/user.entity';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createSchedule(
    @Req() req,
    @Body() createScheduleDTO: CreateScheduleDTO,
  ) {
    await this.scheduleService.createSchedule(
      createScheduleDTO,
      req.user as UserEntity,
    );

    return { statusCode: 201, message: 'success create schedule' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async fetchScheduleList(@Req() req): Promise<ScheduleResDTO[]> {
    const scheduleList = this.scheduleService.fetchScheduleList(
      req.user as UserEntity,
    );

    return scheduleList;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:schedule_id')
  async fetchScheduleById(
    @Req() req,
    @Param('schedule_id') id: number,
  ): Promise<ScheduleResDTO> {
    const schedule = this.scheduleService.fetchScheduleById(
      id,
      req.user as UserEntity,
    );

    return schedule;
  }
}
