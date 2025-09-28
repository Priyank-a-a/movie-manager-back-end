import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from './movie/movie.module';
import { User } from './auth/user.entity';
import { AuthModule } from './auth/auth.module';
import { Movie } from './movie/movie.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

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
      entities: [User, Movie],
      synchronize: true,
    }),

    // Serve uploaded files under /uploads
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),

    AuthModule,
    MovieModule,
  ],
})
export class AppModule {}
