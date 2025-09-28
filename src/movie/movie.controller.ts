import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './movie.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('movies')
@UseGuards(JwtAuthGuard)
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get()
  findAll(): Promise<Movie[]> {
    return this.movieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Movie> {
    return this.movieService.findOne(+id);
  }

  @Post()
  create(@Body() movie: Partial<Movie>): Promise<Movie> {
    return this.movieService.create(movie);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() movie: Partial<Movie>,
  ): Promise<Movie> {
    return this.movieService.update(+id, movie);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.movieService.remove(+id);
  }
}
