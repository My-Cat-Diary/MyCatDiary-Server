import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatEntity } from './entity/cat.entity';
import { Repository } from 'typeorm';
import { CreateCatDTO } from './dto/cat.dto';

@Injectable()
export class CatRepository {
  constructor(
    @InjectRepository(CatEntity)
    private readonly catRepository: Repository<CatEntity>,
  ) {}

  async createCat(
    createCatDTO: CreateCatDTO,
    userId: number,
  ): Promise<CatEntity> {
    const cat = this.catRepository.create({
      userId,
      birthDay: createCatDTO.birth_day,
      ...createCatDTO,
    });
    await this.catRepository.save(cat);

    return cat;
  }

  async getCatById(id: number): Promise<CatEntity> {
    const cat = await this.catRepository.findOneBy({ id });

    return cat;
  }

  async getCatList(userId: number): Promise<CatEntity[]> {
    const catList = await this.catRepository.findBy({ userId });

    return catList;
  }

  async deleteCatById(id: number, userId: number): Promise<CatEntity> {
    const cat = await this.catRepository.findOneBy({ id, userId });
    if (cat) await this.catRepository.delete({ id, userId });

    return cat;
  }
}
