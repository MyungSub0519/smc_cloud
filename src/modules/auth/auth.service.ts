import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AuthMailInfoDTO,
  CheckAuthCodeDTO,
  PostCheckAuthParams,
  SendAuthMailParams,
} from './dto/auth.dto';
import { sendAuthMail } from './auth.utils';
import { EmailAuthCode } from './schema/auth.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(EmailAuthCode.name) private authModel: Model<EmailAuthCode>,
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
}
