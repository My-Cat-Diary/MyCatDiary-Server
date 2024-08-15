import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserRepository } from './user.repository';
import { CatRepository } from 'src/cat/cat.repository';
import { CatEntity } from 'src/cat/entity/cat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, CatEntity])],
  controllers: [UserController],
  providers: [UserService, UserRepository, CatRepository],
})
export class UserModule {}
