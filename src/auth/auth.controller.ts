import { Controller } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Controller('auth')
export class AuthController {
  constructor(private boardsService: UserRepository) {}
}
