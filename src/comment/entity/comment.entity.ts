import { UserEntity } from 'src/user/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'comment' })
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'communityId' })
  communityId: number;

  @ManyToOne(() => UserEntity, (user) => user.commentList, { eager: true })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'userId' }])
  user: UserEntity;
}
