import { IsEnum, IsString } from 'class-validator';
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
  title: string;

  content: string;

  category: Category;
}

export class CommunityDetailResDTO {
  community_id: number;

  title: string;

  content: string;

  category: Category;

  created_at: Date;

  updated_at: Date;

  user: UserInfoDTO;

  comment_list: CommentResDTO[];
}
export class CommunityResDTO {
  community_id: number;

  title: string;

  content: string;

  category: Category;

  created_at: Date;

  updated_at: Date;

  user: UserInfoDTO;
}
