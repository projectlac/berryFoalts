/* eslint-disable arrow-parens */
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { TIMESTAMP_TYPE } from "../../utility/constance";
import convertToSlug from "../../utility/covertToSlug";

import { User } from "./user.entity";

@Entity()
export class GameList extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne((type) => User, { nullable: false })
  creator: User;

  @Column()
  title: string;

  @Column()
  slug: string;

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    this.slug = convertToSlug(this.title);
  }

  @Column({ type: TIMESTAMP_TYPE, default: () => "CURRENT_TIMESTAMP" })
  @CreateDateColumn({ type: TIMESTAMP_TYPE })
  createdAt: Date;

  @Column({ type: TIMESTAMP_TYPE, default: () => "CURRENT_TIMESTAMP" })
  @UpdateDateColumn({ type: TIMESTAMP_TYPE })
  updatedAt: Date;
}
