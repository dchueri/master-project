import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export class User {
  @PrimaryColumn({ type: 'uuid' })
  id: string;
  @Column({ type: 'varchar', width: 200 })
  name: string;
  @Column({ unique: true, type: 'varchar', width: 100 })
  username: string;
  @Column({ type: 'varchar', width: 200 })
  password: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
