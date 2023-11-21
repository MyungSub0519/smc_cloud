import { Module } from '@nestjs/common';
import { AccountModule } from './modules/account/account.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { SmcStoageModule } from './modules/smc_stoage/smc_stoage.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // MongooseModule.forRoot(process.env.MONGODB_URL),
    // AccountModule,
    // AuthModule,
    SmcStoageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
