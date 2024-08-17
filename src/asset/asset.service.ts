import { Injectable } from '@nestjs/common';
import { createImageURL } from 'src/lib/multerOptions';

@Injectable()
export class AssetService {
  uploadFiles(files: Express.Multer.File[]): string[] {
    const generatedFiles: string[] = [];

    files.forEach(async (file) => {
      console.log(file);
      generatedFiles.push(createImageURL(file));
    });

    return generatedFiles;
  }
}
