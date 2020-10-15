import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies') // Url 엔트리 포인트
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get() // 해당 엔트리포인트의 root
  getAll(): Movie[] {
    /**
     * Nestjs 는 express & Fastify 두개의 프레임워크 위에서 동시에 돌아간다.
     * express에서 사용하는 객체를 접근할 수 있지만, express 와 fastify 전환이 힘들어진다.
     */
    return this.moviesService.getAll();
  }

  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `We are searching for a movie made after : ${searchingYear}`;
  }

  @Get(':id')
  getOne(@Param('id') movieId: number): Movie {
    return this.moviesService.getOne(movieId);
  }

  //   {
  // 	"title":"Tenet",
  // 	"year":2020,
  // 	"genres":["action", "min blown"]
  // }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }

  @Delete(':id')
  remove(@Param('id') movieId: number) {
    return this.moviesService.deleteOne(movieId);
  }

  @Patch(':id')
  patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.moviesService.update(movieId, updateData);
  }
}
