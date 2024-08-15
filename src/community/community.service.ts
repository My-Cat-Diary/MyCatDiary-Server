import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommunityRepository } from './community.repository';
import {
  CommunityResDTO,
  CreateCommunityDTO,
  EditCommunityDTO,
} from './dto/community.dto';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class CommunityService {
  constructor(
    private readonly communityRepository: CommunityRepository,
    private readonly userRepository: UserRepository,
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
        user: community.user,
      }),
    );
  }

  async fetchCommunityById(id: number): Promise<CommunityResDTO> {
    const community = await this.communityRepository.fetchCommunityById(id);

    if (!community) throw new NotFoundException();
    else {
      return {
        community_id: community.id,
        title: community.title,
        content: community.content,
        category: community.category,
        created_at: community.createdAt,
        updated_at: community.updatedAt,
        user: community.user,
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
        user: community.user,
      };
  }
}
