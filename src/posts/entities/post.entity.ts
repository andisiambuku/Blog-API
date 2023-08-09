import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserAuth } from '../../user-auth/entities/user-auth.entity';

@Entity()
export class BlogPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @ManyToOne(() => UserAuth, (userauth) => userauth.posts)
  userauth: UserAuth;
}
