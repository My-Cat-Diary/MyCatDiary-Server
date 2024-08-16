import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './entity/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDTO } from './dto/comment.dto';
import { UserEntity } from 'src/user/entity/user.entity';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async createComment(
    communityId: number,
    createCommentDTO: CreateCommentDTO,
    user: UserEntity,
  ): Promise<CommentEntity> {
    const currentTime = new Date();
    const comment = this.commentRepository.create({
      ...createCommentDTO,
      createdAt: currentTime,
      updatedAt: currentTime,
      communityId: communityId,
      user: user,
    });

    await this.commentRepository.save(comment);

    return comment;
  }

  async fetchCommentList(communityId: number): Promise<CommentEntity[]> {
    const commentList = await this.commentRepository.findBy({ communityId });

    return commentList;
  }
}
