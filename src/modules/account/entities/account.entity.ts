import { IsUUID, IsEmail } from 'class-validator';
import { UUID } from 'crypto';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'account' })
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  account_UUID: UUID;

  @Column({ unique: true, nullable: false })
  @IsEmail()
  email: string;

  @Column({ unique: true, nullable: false })
  id: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  name: string;
}
