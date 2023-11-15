import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsEmail, IsNumber, IsDate } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type EmailAuthCodeDocument = HydratedDocument<EmailAuthCode>;

@Schema()
export class EmailAuthCode {
  @Prop({ unique: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Prop()
  @IsNotEmpty()
  @IsNumber()
  EmailAuthCodeCode: number;

  @Prop({ type: Date, expires: 300, default: Date.now() })
  @IsNotEmpty()
  @IsDate()
  createDate: Date;
}

export const EmailAuthCodeSchema = SchemaFactory.createForClass(EmailAuthCode);
