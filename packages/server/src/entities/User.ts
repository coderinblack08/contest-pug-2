import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column("text")
  profilePicture: string;

  @Column("text", { unique: true, nullable: true })
  username: string | null;

  @Column("text", { unique: true })
  googleId: string;

  @Column("text", { nullable: true })
  googleAccessToken: string | null;

  @Column("jsonb", { nullable: true })
  other: any;

  @Column("int", { default: 1 })
  tokenVersion: number;

  @CreateDateColumn({ type: "time with time zone" })
  createdAt: number;
}
