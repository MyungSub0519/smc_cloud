import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { SignUpDTO } from './dto/account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  signUp(@Body() params: SignUpDTO) {
    this.accountService.signup();
  }
}
