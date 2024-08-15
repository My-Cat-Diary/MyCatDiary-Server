import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommunityEntity } from './entity/community.entity';
import { Repository } from 'typeorm';
import { CreateCommunityDTO, EditCommunityDTO } from './dto/community.dto';
import { UserEntity } from 'src/user/entity/user.entity';

@Injectable()
export class CommunityRepository {
  constructor(
    @InjectRepository(CommunityEntity)
    private readonly communityRepository: Repository<CommunityEntity>,
  ) {}

  async createCommunity(
    createCommunityDTO: CreateCommunityDTO,
    user: UserEntity,
  ): Promise<CommunityEntity> {
    const currentTime = new Date();
    const community = this.communityRepository.create({
      ...createCommunityDTO,
      createdAt: currentTime,
      updatedAt: currentTime,
      user: user,
    });
    await this.communityRepository.save(community);

    return community;
  }

  async fetchCommunityList(): Promise<CommunityEntity[]> {
    const communityList = await this.communityRepository.find();

    return communityList;
  }

  async fetchCommunityById(id: number): Promise<CommunityEntity> {
    const community = await this.communityRepository.findOneBy({ id });

    return community;
  }

  async editCommunity(
    id: number,
    user: UserEntity,
    editCommunityDTO: EditCommunityDTO,
  ): Promise<CommunityEntity> {
    const currentTime = new Date();

    await this.communityRepository.update(
      { id, user },
      { ...editCommunityDTO, updatedAt: currentTime },
    );

    return await this.communityRepository.findOneBy({
      id,
      user,
    });
  }
}
