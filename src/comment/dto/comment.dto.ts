import { IsDate, IsNumber, IsObject, IsString } from 'class-validator';
import { UserInfoDTO } from 'src/user/dto/user.dto';

export class CreateCommentDTO {
  @IsString()
  content: string;
}

export class CommentResDTO {
  @IsNumber()
  id: number;

  @IsString()
  content: string;

  @IsDate()
  created_at: Date;

  @IsDate()
  updated_at: Date;

  @IsNumber()
  community_id: number;

  @IsObject()
  user: UserInfoDTO;
}
