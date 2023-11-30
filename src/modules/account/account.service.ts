import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AccountEntity } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInParams, SignUpParams } from './dto/account.dto';
import { isEmpty } from 'src/lib/utils';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
    private authService: AuthService,
  ) {}

  async signup(params: SignUpParams) {
    return this.accountRepository.insert(params);
  }

  async signin(params: SignInParams) {
    const result = await this.accountRepository.find({
      where: params,
    });
    if (isEmpty(result)) {
      throw new UnauthorizedException('아이디 또는 비밀번호가 맞지 않습니다.');
    } else {
      return await this.authService.generateAllToken(params);
    }
  }
}
