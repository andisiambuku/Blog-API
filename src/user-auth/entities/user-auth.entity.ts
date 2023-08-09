import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BlogPost } from '../../posts/entities/post.entity';

@Entity()
export class UserAuth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => BlogPost, (post) => post.userauth)
  posts: BlogPost[];
}
