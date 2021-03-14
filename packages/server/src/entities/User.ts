import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Contest } from "./Contest";
import { Member } from "./Member";
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

  @Column("text", { nullable: true })
  googleRefreshToken: string | null;

  @Column("jsonb", { nullable: true })
  other: any;

  @Column("int", { default: 1 })
  tokenVersion: number;

  @OneToMany(() => Contest, (c) => c.creator)
  contests: Promise<Contest[]>;

  @OneToMany(() => Member, (m) => m.user)
  joined: Promise<Member[]>;

  @UpdateDateColumn({ type: "time with time zone" })
  updatedAt: Date;

  @CreateDateColumn({ type: "time with time zone" })
  createdAt: Date;
}
