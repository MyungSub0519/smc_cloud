import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailAuthCode, EmailAuthCodeSchema } from './schema/auth.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: EmailAuthCode.name, schema: EmailAuthCodeSchema  }]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
