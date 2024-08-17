import {
  IsNumber,
  IsObject,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CatResDTO } from 'src/cat/dto/cat.dto';

export class UserInfoDTO {
  @IsNumber()
  user_id: number;

  @IsString()
  id: string;

  @IsString()
  username: string;

  @IsString()
  image_url: string;
}

export class CreateUserDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  id: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(16)
  @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/, {
    message:
      '패스워드는 8~20자리이며 최소 하나 이상의 영문자, 최소 하나 이상의 숫자, 최소 하나 이상의 특수문자를 입력해야 합니다.',
  })
  password: string;

  @IsString()
  image_url?: string;
}

export class SignInUserDTO {
  @IsString()
  id: string;

  @IsString()
  password: string;
}

export class UserAndCatInfoDTO {
  @IsObject()
  user: UserInfoDTO;

  @IsObject()
  cats: CatResDTO[];
}

export class UserTokenDTO {
  @IsNumber()
  user_id: number;

  @IsString()
  access_token: string;

  @IsString()
  refresh_token: string;
}
