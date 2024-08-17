import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'diary' })
export class DiaryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ name: 'image_urls' })
  imageUrls: string[];

  @Column()
  day: Date;

  @Column()
  userId: number;
}
