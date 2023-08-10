import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Entity,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import { Blogpost } from '../../blogposts/entities/blogpost.entity';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(() => Blogpost, (blogpost) => blogpost.user)
  blogposts: Blogpost[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
