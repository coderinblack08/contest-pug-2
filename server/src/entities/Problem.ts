import { LexoRank } from "lexorank";
import { Field, ObjectType } from "type-graphql";
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

@ObjectType()
@Entity()
export class Problem extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  contestId: string;

  @Field()
  @Index()
  @Column({ default: LexoRank.middle().toString() })
  rank: string;

  @Field()
  @Column({ default: "short_answer" })
  type: "short_answer" | "free_response";

  @Field()
  @Column()
  question: string;

  @Field()
  @Column({ default: 1 })
  points: number;

  @Field()
  @Column({ default: 0 })
  penalty: number;

  @ManyToOne(() => Contest, (c) => c.problems, { onDelete: "CASCADE" })
  @JoinColumn({ name: "contestId" })
  contest: Promise<Contest>;
}
