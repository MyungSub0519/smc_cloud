import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AccountEntity } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpParams } from './dto/account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
  ) {}

  async signup(params: SignUpParams) {
    return this.accountRepository.insert(params);
  }
}
