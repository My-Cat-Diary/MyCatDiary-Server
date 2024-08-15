import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateUserDTO,
  SignInUserDTO,
  UserTokenDTO,
} from 'src/user/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  async signup(@Body() createUserDTO: CreateUserDTO): Promise<UserTokenDTO> {
    return await this.authService.signup(createUserDTO);
  }

  @Post('/signin')
  async signin(@Body() signInUserDTO: SignInUserDTO): Promise<UserTokenDTO> {
    return await this.authService.signin(signInUserDTO);
  }
}
