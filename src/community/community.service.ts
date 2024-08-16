import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommunityRepository } from './community.repository';
import {
  CommunityDetailResDTO,
  CommunityResDTO,
  CreateCommunityDTO,
  EditCommunityDTO,
} from './dto/community.dto';
import { UserEntity } from 'src/user/entity/user.entity';
import { CommentRepository } from 'src/comment/comment.repository';
import { CommentResDTO, CreateCommentDTO } from 'src/comment/dto/comment.dto';

@Injectable()
export class CommunityService {
  constructor(
    private readonly communityRepository: CommunityRepository,
    private readonly commentRepository: CommentRepository,
  ) {}

  async createCommunity(
    createCommunityDTO: CreateCommunityDTO,
    user: UserEntity,
  ): Promise<void> {
    const community = await this.communityRepository.createCommunity(
      createCommunityDTO,
      user,
    );

    if (!community) throw new NotFoundException();
  }

  async fetchCommunityList(): Promise<CommunityResDTO[]> {
    const communityList = await this.communityRepository.fetchCommunityList();

    return communityList.map(
      (community): CommunityResDTO => ({
        community_id: community.id,
        title: community.title,
        content: community.content,
        category: community.category,
        created_at: community.createdAt,
        updated_at: community.updatedAt,
        user: {
          id: community.user.id,
          user_id: community.user.userId,
          username: community.user.username,
        },
      }),
    );
  }

  async fetchCommunityById(id: number): Promise<CommunityDetailResDTO> {
    const community = await this.communityRepository.fetchCommunityById(id);
    const commentList = await this.commentRepository.fetchCommentList(id);

    if (!community) throw new NotFoundException();
    else {
      return {
        community_id: community.id,
        title: community.title,
        content: community.content,
        category: community.category,
        created_at: community.createdAt,
        updated_at: community.updatedAt,
        user: {
          id: community.user.id,
          user_id: community.user.userId,
          username: community.user.username,
        },
        comment_list: commentList.map(
          (comment): CommentResDTO => ({
            id: comment.id,
            content: comment.content,
            created_at: comment.createdAt,
            updated_at: comment.updatedAt,
            community_id: comment.communityId,
            user: {
              user_id: comment.user.userId,
              id: comment.user.id,
              username: comment.user.username,
            },
          }),
        ),
      };
    }
  }

  async editCommunityById(
    id: number,
    user: UserEntity,
    editCommunityDTO: EditCommunityDTO,
  ): Promise<CommunityResDTO> {
    const community = await this.communityRepository.editCommunity(
      id,
      user,
      editCommunityDTO,
    );

    if (!community) throw new ForbiddenException();
    else
      return {
        community_id: community.id,
        title: community.title,
        content: community.content,
        category: community.category,
        created_at: community.createdAt,
        updated_at: community.updatedAt,
        user: {
          id: community.user.id,
          user_id: community.user.userId,
          username: community.user.username,
        },
      };
  }

  async createComment(
    communityId: number,
    createCommentDTO: CreateCommentDTO,
    user: UserEntity,
  ): Promise<void> {
    const comment = await this.commentRepository.createComment(
      communityId,
      createCommentDTO,
      user,
    );

    if (!comment) throw new BadRequestException();
  }
}
