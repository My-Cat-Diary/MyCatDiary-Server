import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CatService } from './cat.service';
import { AuthGuard } from '@nestjs/passport';
import { CatResDTO, CreateCatDTO } from './dto/cat.dto';
import { UserEntity } from 'src/user/entity/user.entity';

@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  @Post('/')
  async createCat(@Body() createCatDTO: CreateCatDTO, @Req() req) {
    await this.catService.createCat(createCatDTO, req.user as UserEntity);

    return { statusCode: 201, message: "success set cat's info" };
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Get('/')
  async fetchMyCatList(@Req() req): Promise<CatResDTO[]> {
    const catList = await this.catService.getMyCatList(req.user as UserEntity);

    return catList;
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Get('/:id')
  async fetchCatById(@Param('id') id: number): Promise<CatResDTO> {
    const cat = await this.catService.getCatById(id);

    return cat;
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(204)
  @Delete('/:id')
  async deleteMyCat(@Param('id') id: number, @Req() req) {
    await this.catService.deleteMyCat(id, req.user as UserEntity);
  }
}
