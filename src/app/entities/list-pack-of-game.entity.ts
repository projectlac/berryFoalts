// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { TIMESTAMP_TYPE } from "../../utility/constance";
import { GameList } from "./game-list.entity";
import { User } from "./user.entity";

@Entity()
export class ListPackOfGame extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // eslint-disable-next-line arrow-parens
  @ManyToOne((type) => User, { nullable: false })
  creator: User;

  // eslint-disable-next-line arrow-parens
  @ManyToOne((type) => GameList, (game) => game.slug, { nullable: false })
  belongTo: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  accumulate: number;

  @Column({ type: TIMESTAMP_TYPE, default: () => "CURRENT_TIMESTAMP" })
  @CreateDateColumn({ type: TIMESTAMP_TYPE })
  createdAt: Date;

  @Column({ type: TIMESTAMP_TYPE, default: () => "CURRENT_TIMESTAMP" })
  @UpdateDateColumn({ type: TIMESTAMP_TYPE })
  updatedAt: Date;
}
