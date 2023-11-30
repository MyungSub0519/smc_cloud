import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpParams {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;
}

export class SignInParams {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  password: string;
}