import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialDTO } from './dto/auth-credential.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  singUp(authCredentialDTO: AuthCredentialDTO): Promise<User> {
    const user = this.userRepository.createUser(authCredentialDTO);

    return user;
  }
}
