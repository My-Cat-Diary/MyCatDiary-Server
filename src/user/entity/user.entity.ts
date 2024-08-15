import { CommunityEntity } from 'src/community/entity/community.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Column({ unique: true, nullable: false })
  id: string;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => CommunityEntity, (community) => community.user)
  communityList: CommunityEntity[];
}
