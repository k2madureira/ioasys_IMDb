import { Request, Response } from 'express';

import User from '@modules/User/models/User';
import Movie from '../models/Movie';
import Score from '../models/Score';
import ICreateMovieDTO from '../dtos/ICreateMovieDTO';

interface IMovie {
  id: number;
  tt: string;
  title: string;
  year: string;
  director: string;
  genre: string;
  actors: string;
  createdAt: Date;
  updatedAt: Date;
  scores: [
    {
      id: number;
      user_id: number;
      movie_id: number;
      score: number;
      createdAt: Date;
      updatedAt: Date;
    },
  ];
}

export default class MovieController {
  public async list(
    request: Request,
    response: Response,
  ): Promise<Response<ICreateMovieDTO>> {
    try {
      const filter = request.query;

      const query = filter
        ? {
            where: filter,
            include: [{ as: 'scores', model: Score }],
          }
        : {
            include: [{ as: 'scores', model: Score }],
          };

      const listMovies = await Movie.findAll(query);

      return response.json(listMovies);
    } catch (error) {
      return response.status(500).json({ error: 'Error' });
    }
  }

  public async detail(
    request: Request,
    response: Response,
  ): Promise<Response<ICreateMovieDTO>> {
    try {
      const { id } = request.params;

      const listMovies = await Movie.findAll({
        where: {
          id,
        },
        include: [{ as: 'scores', model: Score }],
      });

      const mappedMovies = listMovies.map(movie => {
        const objm: IMovie = movie; // Object Movie
        const numbersMovie = objm.scores.reduce(
          (total, s): any => {
            total.sum += s.score;
            total.count += 1;
            return total;
          },
          {
            count: 0,
            sum: 0,
          },
        );

        const editedObject = {
          id: objm.id,
          tt: objm.tt,
          title: objm.title,
          year: objm.year,
          director: objm.director,
          actors: objm.actors,
          genre: objm.genre,
          total_votes: numbersMovie.count,
          average_votes: numbersMovie.sum / numbersMovie.count,
        };

        return editedObject;
      });

      return response.json(mappedMovies);
    } catch (error) {
      return response.status(500).json({ error: 'Error' });
    }
  }

  public async create(
    request: Request,
    response: Response,
  ): Promise<Response<ICreateMovieDTO>> {
    try {
      const { tt, title, year, director, genre, actors } = request.body;

      const findAdmin = await User.findOne({
        where: {
          id: request.user.id,
          admin: true,
        },
      });

      if (!findAdmin) {
        return response.status(401).json({
          error: 'You need to be an administrator to register a movie',
        });
      }

      if (!tt || !title || !director || !genre) {
        return response.status(401).json({
          error: 'Please fill in the tt, title, director and genre fields.',
        });
      }

      const findMovie = await Movie.findOne({
        where: { tt },
      });

      if (findMovie) {
        return response
          .status(401)
          .json({ error: 'This film has already been registered.' });
      }

      const newMovie = await Movie.create({
        tt,
        title,
        year,
        director,
        genre,
        actors,
      });

      const responseMovie = {
        message: 'Movie successfully registered ✅',
        infos: {
          id: newMovie.id,
          tt: newMovie.tt,
          title: newMovie.title,
          year: newMovie.year,
          director: newMovie.director,
          genre: newMovie.genre,
          actors: newMovie.actors,
        },
      };

      return response.json(responseMovie);
    } catch (error) {
      return response.status(500).json({ error: 'Error' });
    }
  }

  public async update(
    request: Request,
    response: Response,
  ): Promise<Response<ICreateMovieDTO> | Response> {
    try {
      const { tt, title, year, director, genre, actors } = request.body;
      const { id } = request.params;

      const findAdmin = await User.findOne({
        where: {
          id: request.user.id,
          admin: true,
        },
      });

      if (!findAdmin) {
        return response.status(401).json({
          error: 'You must be an administrator to update a movie.',
        });
      }

      const movie = await Movie.findOne({
        where: { id },
      });

      if (!movie) {
        return response.status(401).json({ error: 'Movie ID not found!' });
      }

      const updatedMovie = {
        tt: tt || movie.tt,
        title: title || movie.title,
        year: year || movie.year,
        director: director || movie.director,
        genre: genre || movie.genre,
        actors: actors || movie.actors,
      };

      await Movie.update(updatedMovie, { where: { id } });

      return response.status(200).json({
        Movie: {
          id,
          tt: updatedMovie.tt,
          title: updatedMovie.title,
          year: updatedMovie.year,
          director: updatedMovie.director,
          genre: updatedMovie.genre,
          actors: updatedMovie.actors,
        },
      });
    } catch (error) {
      return response.status(500).json({ error: 'Error' });
    }
  }

  public async vote(
    request: Request,
    response: Response,
  ): Promise<Response<ICreateMovieDTO> | Response> {
    try {
      const { score } = request.body;
      const { id: movie_id } = request.params;
      const user_id = request.user.id;

      if (!score && score !== 0) {
        return response.status(401).json({ error: 'Score field is required!' });
      }

      const movie = await Movie.findOne({
        where: { id: movie_id },
      });

      if (!movie) {
        return response.status(401).json({ error: 'Movie ID not found!' });
      }

      if (!Number.isInteger(score) || score < 0 || score > 4) {
        return response
          .status(401)
          .json({ error: 'Vote must be between integers, 0 and 4' });
      }

      await Score.create({
        user_id,
        movie_id,
        score,
      });

      return response
        .status(200)
        .json({ success: 'vote successfully registered' });
    } catch (error) {
      return response.status(500).json({ error: 'Error' });
    }
  }

  public async delete_jest(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { id } = request.params;

      if (process.env.NODE_ENV !== 'test') {
        return response
          .status(401)
          .json({ error: 'This route is used only in test' });
      }

      const movie = await Movie.findOne({
        where: { id },
      });

      if (!movie) {
        return response.status(401).json({ error: 'movie ID not found!' });
      }

      await Movie.destroy({ where: { id } });

      return response.status(200).json({ success: 'deleted' });
    } catch (error) {
      return response.status(500).json({ error: 'Error' });
    }
  }
}
