import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CatRepository } from 'src/cat/cat.repository';
import { UserEntity } from './entity/user.entity';
import { UserAndCatInfoDTO } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly catRepository: CatRepository,
  ) {}

  async fetchUserAndCatInfo(user: UserEntity): Promise<UserAndCatInfoDTO> {
    const owner = await this.userRepository.getUserById(user.id);
    const cats = await this.catRepository.getCatList(user.userId);

    if (owner) {
      return {
        user: {
          id: owner.id,
          user_id: owner.userId,
          username: owner.username,
        },
        cats: cats.map((cat) => ({
          cat_id: cat.id,
          name: cat.name,
          age: cat.age,
          sex: cat.sex,
          birth_day: cat.birthDay,
        })),
      };
    } else {
      throw new NotFoundException();
    }
  }
}
