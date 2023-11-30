import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AuthMailInfoDTO,
  CheckAuthCodeDTO,
  PostCheckAuthParams,
  PostGenerateTokenParams,
  SendAuthMailParams,
} from './dto/auth.dto';
import { sendAuthMail } from './auth.utils';
import { EmailAuthCode } from './schema/auth.schema';
import { JwtService } from '@nestjs/jwt';
import { SignInParams } from '../account/dto/account.dto';
import { RedisService } from './redis.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(EmailAuthCode.name) private authModel: Model<EmailAuthCode>,
    private jwtService: JwtService,
    private redisClient: RedisService,
  ) {}

  async postAuthMail(params: SendAuthMailParams) {
    const authCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    const authDocument = new this.authModel({
      email: params.email,
      EmailAuthCodeCode: authCode,
    });
    authDocument.save();

    await sendAuthMail(params.email, authCode);

    return new AuthMailInfoDTO({ email: params.email, authCode });
  }

  async checkAuthCode(params: PostCheckAuthParams) {
    const authCode = await this.authModel.findOne({ email: params.email });
    const result = params.authCode == authCode.EmailAuthCodeCode;
    return new CheckAuthCodeDTO(result);
  }

  async generateAllToken(params: SignInParams) {
    const accessToken = await this.jwtService.signAsync({ id: params.id });
    const refreshToken = await this.jwtService.signAsync(
      { id: params.id, refreshToken: true },
      {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: '7d',
      },
    );
    await this.redisClient.set(refreshToken, accessToken, 180);
    return { accessToken, refreshToken };
  }

  async generateAccessToken(params: PostGenerateTokenParams) {
    const accessToken = await this.jwtService.signAsync({ id: params.id });
    await this.redisClient.update(params.refreshToken, accessToken);
    return accessToken;
  }

  async redisClear() {
    await this.redisClient.allDataDelete();
  }

  async checkTTL(key) {
    return await this.redisClient.checkTTL(key.key);
  }

  async test() {
    const keys = await this.redisClient.keys();
    const result = {};

    // 각 키에 대해 반복하며 값을 조회합니다.
    for (const key of keys) {
      const value = await this.redisClient.get(key);
      result[key] = value;
    }

    return result;
  }
}
