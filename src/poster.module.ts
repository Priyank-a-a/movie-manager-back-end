import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Poster } from './poster.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Poster])],
  exports: [TypeOrmModule],
})
export class PosterModule {}
