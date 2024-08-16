export class CreateDiaryDTO {
  title: string;
  content: string;
  day: string;
}

export class DiaryResDTO {
  id: number;
  title: string;
  content: string;
  day: Date;
}
