import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialDTO } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { SignUpResponse } from './dto/response/signup-response';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialDTO: AuthCredentialDTO,
  ): Promise<SignUpResponse> {
    return this.authService.singUp(authCredentialDTO);
  }
}
