import { CatResDTO } from 'src/cat/dto/cat.dto';

export class CreateScheduleDTO {
  title: string;
  content: string;
  day: string;
  cat_id: number;
}

export class ScheduleResDTO {
  id: number;
  title: string;
  content: string;
  day: Date;
  cat: CatResDTO;
}
