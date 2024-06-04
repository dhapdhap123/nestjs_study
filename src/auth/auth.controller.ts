import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthCredentialDTO } from './dto/auth-credential.dto';
import { AuthService } from './auth.service';
import { SignUpResponse } from './dto/response/signup-response';
import { SignInResponse } from './dto/response/signin-response';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialDTO: AuthCredentialDTO,
  ): Promise<SignUpResponse> {
    return this.authService.singUp(authCredentialDTO);
  }

  @Post('/signin')
  login(
    @Body(ValidationPipe) authCredentialDTO: AuthCredentialDTO,
  ): Promise<SignInResponse> {
    return this.authService.signIn(authCredentialDTO);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    console.log('user: ', user);
  }
}
