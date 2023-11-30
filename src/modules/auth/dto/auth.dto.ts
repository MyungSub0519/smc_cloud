import { Expose } from 'class-transformer';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

//Params
export class SendAuthMailParams {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class PostCheckAuthParams {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  authCode: number;
}

export class PostGenerateTokenParams {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  refreshToken: string;
}

// DTO
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

export class CheckAuthCodeDTO {
  @IsNotEmpty()
  @IsBoolean()
  result: boolean;

  constructor(result) {
    this.result = result;
  }
}
