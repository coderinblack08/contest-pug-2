import { Field, ObjectType } from "type-graphql";
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
@ObjectType()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("text")
  profilePicture: string;

  @Field(() => String)
  @Column("text", { unique: true })
  username: string;

  @Field(() => String)
  @Column("text", { unique: true })
  displayName: string;

  @Column("text", { unique: true })
  googleId: string | null;

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

  @Field()
  @UpdateDateColumn({ type: "time with time zone" })
  updatedAt: Date;

  @Field()
  @CreateDateColumn({ type: "time with time zone" })
  createdAt: Date;
}
