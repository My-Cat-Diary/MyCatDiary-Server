import { Module } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';
import { CommunityRepository } from './community.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityEntity } from './entity/community.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CommunityEntity, UserEntity])],
  providers: [CommunityService, CommunityRepository, UserRepository],
  controllers: [CommunityController],
})
export class CommunityModule {}
