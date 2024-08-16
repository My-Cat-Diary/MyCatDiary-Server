import {
  IsArray,
  IsDate,
  IsEnum,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';
import { Category } from '../entity/type/community.type';
import { UserInfoDTO } from 'src/user/dto/user.dto';
import { CommentResDTO } from 'src/comment/dto/comment.dto';

export class CreateCommunityDTO {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsEnum(Category)
  category: Category;
}

export class EditCommunityDTO {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  category: Category;
}

export class CommunityDetailResDTO {
  @IsNumber()
  community_id: number;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsObject()
  category: Category;

  @IsDate()
  created_at: Date;

  @IsDate()
  updated_at: Date;

  @IsObject()
  user: UserInfoDTO;

  @IsArray()
  comment_list: CommentResDTO[];
}
export class CommunityResDTO {
  @IsNumber()
  community_id: number;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsEnum(Category)
  category: Category;

  @IsDate()
  created_at: Date;

  @IsDate()
  updated_at: Date;

  @IsObject()
  user: UserInfoDTO;
}
