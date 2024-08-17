import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './type/community.type';
import { UserEntity } from 'src/user/entity/user.entity';

@Entity({ name: 'community' })
export class CommunityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ name: 'image_urls' })
  imageUrls: string[];

  @Column({ default: 'ETC' })
  category: Category;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.communityList, { eager: true })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'userId' }])
  user: UserEntity;
}
