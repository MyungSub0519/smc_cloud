import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SendAuthMailParams } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/mail')
  postAuthMail(@Body() params: SendAuthMailParams) {
    return this.authService.postAuthMail(params);
  }
}
