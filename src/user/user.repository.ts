import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<UserEntity> {
    const user = this.userRepository.create(createUserDTO);

    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Unique constraint violation');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return user;
  }

  async getUserById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id });

    return user;
  }
}
