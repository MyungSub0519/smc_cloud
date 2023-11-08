import { Module } from '@nestjs/common';
import { AccountModule } from './modules/account/account.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    AccountModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
