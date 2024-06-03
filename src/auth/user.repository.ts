import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthCredentialDTO } from './dto/auth-credential.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredentialDTO: AuthCredentialDTO): Promise<User> {
    const { username, password } = authCredentialDTO;

    const user = this.create({
      username,
      password,
    });

    try {
      await this.save(user);
    } catch (err) {
      if (err.code === '23505')
        throw new ConflictException('Existing username');
      else {
        throw new InternalServerErrorException();
      }
    }

    return user;
  }
}
