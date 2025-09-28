import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../auth/user.entity';
import { Poster } from 'src/poster.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  publishingYear: number;

  @ManyToOne(() => User, (user) => user.movies)
  createdBy: User;

  @OneToOne(() => Poster, (poster) => poster.movie, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  poster: Poster;
}
