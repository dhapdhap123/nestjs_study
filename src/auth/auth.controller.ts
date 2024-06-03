import { Body, Controller, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialDTO } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialDTO: AuthCredentialDTO): Promise<User> {
    return this.authService.singUp(authCredentialDTO);
  }
}
