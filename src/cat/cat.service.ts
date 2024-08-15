import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CatRepository } from './cat.repository';
import { CatResDTO, CreateCatDTO } from './dto/cat.dto';
import { UserEntity } from 'src/user/entity/user.entity';

@Injectable()
export class CatService {
  constructor(private readonly catRepository: CatRepository) {}

  async createCat(createCatDTO: CreateCatDTO, user: UserEntity): Promise<void> {
    const cat = await this.catRepository.createCat(createCatDTO, user.userId);

    if (!cat) throw new BadRequestException();
  }

  async getCatById(id: number): Promise<CatResDTO> {
    const cat = await this.catRepository.getCatById(id);

    if (!cat) throw new NotFoundException();
    else
      return {
        cat_id: cat.id,
        name: cat.name,
        age: cat.age,
        sex: cat.sex,
        birth_day: cat.birthDay,
      };
  }

  async getMyCatList(user: UserEntity): Promise<CatResDTO[]> {
    const catList = await this.catRepository.getCatList(user.userId);

    return catList.map(
      (cat): CatResDTO => ({
        cat_id: cat.id,
        name: cat.name,
        age: cat.age,
        sex: cat.sex,
        birth_day: cat.birthDay,
      }),
    );
  }

  async deleteMyCat(id: number, user: UserEntity): Promise<void> {
    const cat = await this.catRepository.deleteCatById(id, user.userId);

    if (!cat) throw new NotFoundException();
  }
}
