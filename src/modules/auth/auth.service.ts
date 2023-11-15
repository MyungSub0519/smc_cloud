import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthMailInfoDTO, SendAuthMailParams } from './dto/auth.dto';
import { Auth } from './schema/auth.schema';
import { sendAuthMail } from './auth.utils';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth.name) private authModel: Model<Auth>) {}

  async postAuthMail(params: SendAuthMailParams) {
    const authCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    const authDocument = new this.authModel({
      email: params.email,
      authCode,
    });
    authDocument.save();

    await sendAuthMail(params.email, authCode);

    return new AuthMailInfoDTO({ email: params.email, authCode });
  }

  checkAuthCode() {
    //email 주소 + MongoDB에 존재하는 authCode와 대조
  }
}
