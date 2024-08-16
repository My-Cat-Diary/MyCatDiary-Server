import { IsDate, IsNumber, IsObject, IsString } from 'class-validator';
import { CatResDTO } from 'src/cat/dto/cat.dto';

export class CreateScheduleDTO {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsDate()
  day: Date;

  @IsNumber()
  cat_id: number;
}

export class ScheduleResDTO {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsDate()
  day: Date;

  @IsObject()
  cat: CatResDTO;
}
