import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Session,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { SignUpParams } from './dto/account.dto';
import { Redis } from 'ioredis';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('/signup')
  postSignUp(@Body() params: SignUpParams) {
    return this.accountService.signup(params);
  }
}
