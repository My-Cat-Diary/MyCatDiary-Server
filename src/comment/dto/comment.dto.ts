import { UserInfoDTO } from 'src/user/dto/user.dto';

export class CreateCommentDTO {
  content: string;
}

export class CommentResDTO {
  id: number;

  content: string;

  created_at: Date;

  updated_at: Date;

  community_id: number;

  user: UserInfoDTO;
}
