import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthCredentialDTO } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { SignUpResponse } from './dto/response/signup-response';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(
    authCredentialDTO: AuthCredentialDTO,
  ): Promise<SignUpResponse> {
    const { username, password } = authCredentialDTO;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
    } catch (err) {
      if (err.code === '23505')
        throw new ConflictException('Existing username');
      else {
        throw new InternalServerErrorException();
      }
    }

    return { success: true };
  }
}
