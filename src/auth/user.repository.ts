import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
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

    await this.save(user);

    return user;
  }
}
