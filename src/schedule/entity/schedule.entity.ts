import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'schedule' })
export class ScheduleEntity {
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

  @Column()
  catId: number;
}
