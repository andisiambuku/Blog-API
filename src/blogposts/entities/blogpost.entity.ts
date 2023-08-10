import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToOne,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
@Entity()
export class Blogpost extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  body: string;

  @ManyToOne(() => User, (user) => user.blogposts, { eager: true })
  user: User;
}
