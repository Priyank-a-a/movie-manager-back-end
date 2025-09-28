import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Movie } from './movie/movie.entity';

@Entity()
export class Poster {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string; // store image URL instead of file

  @OneToOne(() => Movie, (movie) => movie.poster)
  movie: Movie;
}
