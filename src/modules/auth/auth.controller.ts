import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Session,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SendAuthMailParams, PostCheckAuthParams } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/mail')
  postAuthMail(@Body() params: SendAuthMailParams) {
    return this.authService.postAuthMail(params);
  }

  @Post('/check')
  postCheckAuth(@Body() params: PostCheckAuthParams) {
    return this.authService.checkAuthCode(params);
  }
}
