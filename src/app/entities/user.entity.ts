import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { TIMESTAMP_TYPE } from "../../utility/constance";
// const uuid = require("uuid");
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  fname: string;

  @Column()
  lname: string;

  @Column()
  avatar: string;

  @Column({ type: TIMESTAMP_TYPE, default: () => "CURRENT_TIMESTAMP" })
  @CreateDateColumn({ type: TIMESTAMP_TYPE })
  createdAt: Date;

  @Column({ type: TIMESTAMP_TYPE, default: () => "CURRENT_TIMESTAMP" })
  @UpdateDateColumn({ type: TIMESTAMP_TYPE })
  updatedAt: Date;
}

// This line is required. It will be used to create the SQL session table later in the tutorial.
export { DatabaseSession } from "@foal/typeorm";
