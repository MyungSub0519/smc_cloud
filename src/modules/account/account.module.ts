import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './entities/account.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity]), AuthModule],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
