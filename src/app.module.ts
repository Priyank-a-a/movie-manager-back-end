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
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'moviemanagerdb-1.cxamaiqqe85n.ap-southeast-2.rds.amazonaws.com',
      port: 5432,
      username: 'postgres',
      password: 'postgres#1',
      database: 'postgres',
      entities: [User, Movie],
      ssl: {
        rejectUnauthorized: false, // allow self-signed AWS cert
      },
      autoLoadEntities: true,
      synchronize: true, // for dev only, auto-create tables
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'movie_user',
    //   password: 'password123',
    //   database: 'movie_db',
    //   entities: [User, Movie],
    //   synchronize: true,
    // }),

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
