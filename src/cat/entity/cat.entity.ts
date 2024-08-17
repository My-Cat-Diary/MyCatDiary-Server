import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SexType } from './type/cat.sex-type';

@Entity({ name: 'cat' })
export class CatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'image_url' })
  imageUrl: string;

  @Column({ nullable: false })
  name: string;

  @Column({ default: 'NONE' })
  sex: SexType;

  @Column()
  age: number;

  @Column({ name: 'birth_day' })
  birthDay: Date;

  @Column({ name: 'user_id' })
  userId: number;
}
