import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Contest } from "./Contest";
import { User } from "./User";

@Entity()
export class Member extends BaseEntity {
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
