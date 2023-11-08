import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsEmail, IsNumber, IsDate } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<Auth>;

@Schema()
export class Auth {
  @Prop({ unique: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Prop()
  @IsNotEmpty()
  @IsNumber()
  authCode: number;

  @Prop({ type: Date, expires: 300, default: Date.now() })
  @IsNotEmpty()
  @IsDate()
  createDate: Date;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
