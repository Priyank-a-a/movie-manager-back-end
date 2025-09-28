import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './movie.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import type { Express } from 'express';

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

  // Upload poster image
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExt = extname(file.originalname);
          cb(null, `${uniqueSuffix}${fileExt}`);
        },
      }),
    }),
  )
  uploadPoster(@UploadedFile() file: any) {
    // Return public URL served by ServeStaticModule
    return { url: `/uploads/${file.filename}` };
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
