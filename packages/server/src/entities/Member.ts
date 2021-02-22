import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Contest } from "./Contest";
import { User } from "./User";

@Entity()
export class Member extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  contestId: string;

  @PrimaryColumn()
  userId: string;

  @ManyToOne(() => Contest, (u) => u.members, { onDelete: "CASCADE" })
  @JoinColumn({ name: "contestId" })
  contest: Promise<Contest>;

  @ManyToOne(() => User, (u) => u.joined, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: Promise<User>;
}
