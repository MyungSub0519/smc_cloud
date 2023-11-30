import { Controller, Get, Post, Body, Patch, Param, Delete, Session, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SendAuthMailParams, PostCheckAuthParams, PostGenerateTokenParams } from './dto/auth.dto';
import { Response } from 'express';

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

  @Post('/generate-token')
  async postGenerateToken(@Res() res: Response, @Body() params: PostGenerateTokenParams) {
    const accessToken = await this.authService.generateAccessToken(params);
    res.setHeader('Authorization', 'Bearer ' + [accessToken + params.refreshToken]);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
    });
    return res.json({ accessToken });
  }

  @Get('/redis-clear')
  async redisClear() {
    return this.authService.redisClear();
  }

  @Post('/check-ttl')
  async checkTTL(@Body() key) {
    return this.authService.checkTTL(key);
  }

  @Get('/test')
  async test() {
    return this.authService.test();
  }
}
