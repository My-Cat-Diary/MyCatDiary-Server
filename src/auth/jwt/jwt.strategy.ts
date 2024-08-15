import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { Payload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreElements: true,
      secretOrKey: 'rlarldud1234',
    });
  }

  async validate(payload: Payload): Promise<UserEntity> {
    const user = await this.userRepository.getUserById(payload.id);

    if (user) return user;
    else throw new UnauthorizedException();
  }
}
