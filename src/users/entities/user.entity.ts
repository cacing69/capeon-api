import { encodeId } from '../../utils/helpers/helper';
import { Exclude, Expose, Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users', { schema: 'public' })
export class User {
  @Expose()
  @PrimaryGeneratedColumn()
  @Transform(({ value, key, obj, type }) => {
    return `${encodeId(value)}`;
  })
  public id!: number;

  @Expose()
  @Column()
  public firstname!: string;

  @Expose()
  @Column({ nullable: true })
  public lastname?: string;

  @Exclude()
  @Column({ unique: true })
  public email!: string;

  @Exclude()
  @Column()
  public password!: string;

  @Expose()
  @Column({ nullable: true })
  public avatar?: string;

  @Expose()
  @Column({ nullable: true })
  public phone?: string;

  @Exclude()
  @Column({ nullable: true })
  public rememberToken?: string;

  @Exclude()
  @Column({ nullable: true })
  public verifiedAt?: Date;

  @Exclude()
  @CreateDateColumn()
  public createdAt!: Date;

  @Exclude()
  @UpdateDateColumn()
  public updatedAt!: Date;

  @Exclude()
  @DeleteDateColumn({ nullable: true })
  public deletedAt?: Date;

  @Exclude()
  @Column({ nullable: true })
  public lastLoginAt?: Date;

  @Exclude()
  @Column({ nullable: true })
  public createdBy?: number;

  @Exclude()
  @Column({ nullable: true })
  public updatedBy?: number;

  @Exclude()
  @Column({ nullable: true })
  public deletedBy?: number;
}
