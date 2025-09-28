import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from './movie/movie.module';
import { User } from './auth/user.entity';
import { AuthModule } from './auth/auth.module';
import { Movie } from './movie/movie.entity';
import { PosterModule } from './poster.module';
import { Poster } from './poster.entity';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost'
    //   port: 5432,
    //   username: 'your_db_username',
    //   password: 'your_db_password',
    //   database: 'movie_db',
    //   entities: [User, Movie],
    //   synchronize: true, // for dev only, auto-create tables
    // }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'movie_user',
      password: 'password123',
      database: 'movie_db',
      entities: [User, Movie, Poster],
      synchronize: true,
    }),

    AuthModule,
    MovieModule,
    PosterModule,
  ],
})
export class AppModule {}
