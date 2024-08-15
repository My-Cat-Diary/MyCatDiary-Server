import { IsEnum, IsString } from 'class-validator';
import { Category } from '../entity/type/community.type';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserInfoDTO } from 'src/user/dto/user.dto';

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

  created_at: Date;

  user: UserInfoDTO;
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
