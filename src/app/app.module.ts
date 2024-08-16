import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatModule } from '../cat/cat.module';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configulation from 'src/config/configulation';
import { UserEntity } from 'src/user/entity/user.entity';
import { CatEntity } from 'src/cat/entity/cat.entity';
import { CommunityEntity } from 'src/community/entity/community.entity';
import { CommunityModule } from 'src/community/community.module';
import { CommentModule } from 'src/comment/comment.module';
import { CommentEntity } from 'src/comment/entity/comment.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configulation],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (confiService: ConfigService) => ({
        type: 'mysql',
        host: confiService.get('database.host'),
        port: confiService.get('database.port'),
        username: confiService.get('database.user'),
        password: confiService.get('database.password'),
        database: confiService.get('database.name'),
        entities: [UserEntity, CatEntity, CommunityEntity, CommentEntity],
        synchronize: true,
      }),
    }),
    AuthModule,
    UserModule,
    CatModule,
    CommunityModule,
    CommentModule,
  ],
})
export class AppModule {}
