import {
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

  birth_day: Date;
}

export class CatResDTO {
  cat_id: number;

  name: string;

  sex: SexType;

  age: number;

  birth_day: Date;
}
