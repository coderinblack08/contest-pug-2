import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Member } from "./Member";
import { User } from "./User";

@ObjectType()
@Entity()
export class Contest extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("text")
  name: string;

  @Field(() => String, { nullable: true })
  @Column("text", { nullable: true })
  email: string | null;

  @Field(() => String, { nullable: true })
  @Column("text", { nullable: true })
  website: string | null;

  @Field()
  @Column("text")
  description: string;

  @Field(() => Int)
  @Column("int", { default: 0 })
  competitors: number;

  @Field(() => String, { nullable: true })
  @Column("date", { nullable: true })
  start: String | null;

  @Field(() => String, { nullable: true })
  @Column("date", { nullable: true })
  end: String | null;

  @Field()
  @Column()
  creatorId: string;

  @Field(() => User)
  @ManyToOne(() => User, (u) => u.contests, { onDelete: "CASCADE" })
  @JoinColumn({ name: "creatorId" })
  creator: Promise<User>;

  @Field(() => Boolean, { nullable: true })
  isCreator: boolean | null;

  @OneToMany(() => Member, (m) => m.contest)
  members: Promise<Member[]>;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}
