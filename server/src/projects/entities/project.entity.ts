import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export class Project {
  @PrimaryColumn({ type: 'uuid' })
  id: string;
  @Column({ type: 'varchar' })
  title: string;
  @Column({ type: 'integer' })
  zip_code: number;
  @Column({ type: 'timestamp' })
  deadline: Date;
  @Column({ type: 'integer' })
  cost: number;
  @ManyToOne((type) => User)
  @JoinColumn({ referencedColumnName: 'username' })
  username: string;
  @Column({ type: 'boolean', default: false })
  done: boolean;
  @CreateDateColumn({
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
  @UpdateDateColumn({
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
