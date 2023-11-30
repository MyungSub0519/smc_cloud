import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailAuthCode, EmailAuthCodeSchema } from './schema/auth.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { RedisService } from './redis.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forFeature([{ name: EmailAuthCode.name, schema: EmailAuthCodeSchema }]),
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: '3h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RedisService],
  exports: [AuthService],
})
export class AuthModule {}
