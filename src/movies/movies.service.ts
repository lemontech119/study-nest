import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id: string):Movie {
        const movie = this.movies.find(movie => movie.id === parseInt(id));
        if (!movie) {
            throw new NotFoundException(`Movie with ID ${id} not fount`);
        }
        return movie
    } 

    deleteOne(id: string) {
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== +id);
    }

    create(movieData: any) {
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData, 
        })
    }

    update(id: string, updateData){
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({ ...movie, ...updateData});
    }
}
