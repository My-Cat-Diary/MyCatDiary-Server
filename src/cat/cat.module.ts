import { Module } from '@nestjs/common';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { CatRepository } from './cat.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatEntity } from './entity/cat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CatEntity])],
  controllers: [CatController],
  providers: [CatService, CatRepository],
})
export class CatModule {}
