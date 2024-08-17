import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateDiaryDTO {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  image_urls?: string[];

  @IsDate()
  day: Date;
}

export class DiaryResDTO {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  image_urls: string[];

  @IsDate()
  day: Date;
}
