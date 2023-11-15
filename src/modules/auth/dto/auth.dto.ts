import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class SendAuthMailParams {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class AuthMailInfoDTO {
  @Expose()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  authCode: Number;

  constructor(partital: Partial<AuthMailInfoDTO>) {
    Object.assign(this, partital);
  }
}
