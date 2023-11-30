import { Controller, Get, Post, Body, Patch, Delete, Session, Res } from '@nestjs/common';
import { AccountService } from './account.service';
import { SignInParams, SignUpParams } from './dto/account.dto';
import { Response } from 'express';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('/signup')
  postSignUp(@Body() params: SignUpParams) {
    return this.accountService.signup(params);
  }

  @Post('/signin')
  async postSignIn(@Res() res: Response, @Body() params: SignInParams) {
    const jwt = await this.accountService.signin(params);
    res.setHeader('Authorization', 'Bearer ' + [jwt.accessToken + jwt.refreshToken]);
    res.cookie('accessToken', jwt.accessToken, {
      httpOnly: true,
      maxAge: 3 * 60 * 60 * 1000,
    });
    res.cookie('refreshToken', jwt.refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.json(jwt);
  }
}
