import { Module } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';
import { CommunityRepository } from './community.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityEntity } from './entity/community.entity';
import { CommentRepository } from 'src/comment/comment.repository';
import { CommentEntity } from 'src/comment/entity/comment.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { CommentModule } from 'src/comment/comment.module';

@Module({
  imports: [
    CommentModule,
    TypeOrmModule.forFeature([CommunityEntity, UserEntity, CommentEntity]),
  ],
  providers: [CommunityService, CommunityRepository, CommentRepository],
  controllers: [CommunityController],
})
export class CommunityModule {}
