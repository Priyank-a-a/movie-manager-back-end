import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Movie } from '../movie/movie.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
