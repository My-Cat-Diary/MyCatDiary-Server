import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserAndCatInfoDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/info')
  @UseGuards(AuthGuard('jwt'))
  async fetchUserAndCatInfo(@Req() req): Promise<UserAndCatInfoDTO> {
    const userAndInfo = await this.userService.fetchUserAndCatInfo(
      req.user as UserEntity,
    );

    return userAndInfo;
  }
}
