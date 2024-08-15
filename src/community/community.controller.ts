import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  CommunityResDTO,
  CreateCommunityDTO,
  EditCommunityDTO,
} from './dto/community.dto';
import { CommunityService } from './community.service';
import { UserEntity } from 'src/user/entity/user.entity';

@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createCommunity(
    @Req() req,
    @Body() createCommunityDTO: CreateCommunityDTO,
  ) {
    await this.communityService.createCommunity(
      createCommunityDTO,
      req.user as UserEntity,
    );

    return { statusCode: 201, message: 'success create community' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async fetchCommunityList(): Promise<CommunityResDTO[]> {
    const communityList = await this.communityService.fetchCommunityList();

    return communityList;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:community_id')
  async fetchCommunityById(
    @Param('community_id') id: number,
  ): Promise<CommunityResDTO> {
    const community = await this.communityService.fetchCommunityById(id);

    return community;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/:community_id')
  async editCommunityById(
    @Req() req,
    @Param('community_id') id: number,
    @Body() editCommunityDTO: EditCommunityDTO,
  ) {
    const community = await this.communityService.editCommunityById(
      id,
      req.user as UserEntity,
      editCommunityDTO,
    );

    if (community)
      return { status: 200, message: 'success edit the community' };
  }
}
