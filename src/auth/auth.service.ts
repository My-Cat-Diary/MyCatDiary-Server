import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import {
  CreateUserDTO,
  SignInUserDTO,
  UserTokenDTO,
} from 'src/user/dto/user.dto';
import { UserRepository } from 'src/user/user.repository';
import * as bcrypt from 'bcrypt';
import { Payload } from './jwt/jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signup({
    id,
    username,
    password,
  }: CreateUserDTO): Promise<UserTokenDTO> {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    await this.userRepository.createUser({ id, username, password: hash });

    return await this.signin({ id, password });
  }

  async signin({ id, password }: SignInUserDTO): Promise<UserTokenDTO> {
    const user = await this.userRepository.getUserById(id);
    if (user && bcrypt.compareSync(password, user.password)) {
      const payload: Payload = { id, username: user.username };

      const accessToken = this.jwtService.sign(payload);
      const refreshToken = this.jwtService.sign({ id });

      return {
        user_id: user.userId,
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    } else {
      throw new ConflictException();
    }
  }
}
