import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialDTO } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { SignUpResponse } from './dto/response/signup-response';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignInResponse } from './dto/response/signin-response';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  singUp(authCredentialDTO: AuthCredentialDTO): Promise<SignUpResponse> {
    return this.userRepository.createUser(authCredentialDTO);
  }

  async signIn(authCredentialDTO: AuthCredentialDTO): Promise<SignInResponse> {
    const { username, password } = authCredentialDTO;

    const user = await this.userRepository.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { username };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
