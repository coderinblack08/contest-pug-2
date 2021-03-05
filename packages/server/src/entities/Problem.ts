import { LexoRank } from "lexorank";
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Contest } from "./Contest";

@Entity()
export class Problem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contestId: string;

  @Index()
  @Column({ default: LexoRank.middle().toString() })
  rank: string;

  @Column({ default: "text" })
  type: "text" | "rich_text" | "date" | "checkbox" | "radio";

  @Column()
  question: string;

  @Column({ default: 1 })
  points: number;

  @Column({ default: 0 })
  penalty: number;

  @Column("jsonb", { nullable: true })
  choices: { name: string; correct?: boolean }[];

  @Column("jsonb", { nullable: true })
  answers: { answer: string; percentage: number }[];

  @ManyToOne(() => Contest, (c) => c.problems, { onDelete: "CASCADE" })
  @JoinColumn({ name: "contestId" })
  contest: Promise<Contest>;
}
