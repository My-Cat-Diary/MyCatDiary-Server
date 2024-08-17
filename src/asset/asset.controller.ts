import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AssetResDTO } from './dto/asset.dto';
import { AssetService } from './asset.service';
import { multerOptions } from 'src/lib/multerOptions';

@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post('/upload')
  @UseInterceptors(FilesInterceptor('files', 10, multerOptions))
  async uploadAssets(
    @UploadedFiles()
    files: Express.Multer.File[],
  ): Promise<AssetResDTO> {
    const uploadedFiles = this.assetService.uploadFiles(files);

    return { images: uploadedFiles };
  }
}
