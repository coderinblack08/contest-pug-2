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
import { Problem } from "./Problem";
import { User } from "./User";

@Entity()
export class Contest extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  name: string;

  @Column("text", { nullable: true })
  email: string | null;

  @Column("text", { nullable: true })
  website: string | null;

  @Column("text", { nullable: true })
  description: string | null;

  @Column("int", { default: 0 })
  competitors: number;

  @Column()
  creatorId: string;

  @ManyToOne(() => User, (u) => u.contests, { onDelete: "CASCADE" })
  @JoinColumn({ name: "creatorId" })
  creator: Promise<User>;

  @OneToMany(() => Member, (m) => m.contest)
  members: Promise<Member[]>;

  @OneToMany(() => Problem, (p) => p.contest)
  problems: Promise<Problem[]>;

  @UpdateDateColumn({ type: "time with time zone" })
  updatedAt: Date;

  @CreateDateColumn({ type: "time with time zone" })
  createdAt: Date;
}
