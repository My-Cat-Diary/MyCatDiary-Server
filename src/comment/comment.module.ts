import { Module } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entity/comment.entity';
import { UserEntity } from 'src/user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, UserEntity])],
  providers: [CommentRepository],
})
export class CommentModule {}
