import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { SexType } from '../entity/type/cat.sex-type';

export class CreateCatDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(30)
  name: string;

  @IsEnum(SexType)
  sex: SexType;

  @IsNumber()
  age: number;

  @IsDate()
  birth_day: Date;

  @IsString()
  image_url?: string;
}

export class CatResDTO {
  @IsNumber()
  cat_id: number;

  @IsString()
  name: string;

  @IsEnum(SexType)
  sex: SexType;

  @IsNumber()
  age: number;

  @IsDate()
  birth_day: Date;

  @IsString()
  image_url: string;
}
