import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { User } from "./User";

@Entity("users_token")
class UserToken {
  @PrimaryColumn()
  id?: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  user_id: string;

  @Column()
  refresh_token: string;

  @Column()
  expires_in: Date;

  @CreateDateColumn()
  created_at?: Date;

  constructor() {
    if (!this.id) this.id = uuidV4();
  }
}

export { UserToken };
