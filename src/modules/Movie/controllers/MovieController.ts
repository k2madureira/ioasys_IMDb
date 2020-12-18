import { Request, Response } from 'express';

import User from '@modules/User/models/User';
import Movie from '../models/Movie';
import ICreateMovieDTO from '../dtos/ICreateMovieDTO';

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
          }
        : {};

      const listMovies = await Movie.findAll(query);

      return response.json(listMovies);
    } catch (error) {
      return response.status(500).json({ error: 'Error' });
    }
  }

  public async create(
    request: Request,
    response: Response,
  ): Promise<Response<ICreateMovieDTO>> {
    try {
      const { tt, title, director, genre, actors } = request.body;

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
      const { tt, title, director, genre, actors } = request.body;
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
        director: director || movie.director,
        genre: genre || movie.genre,
        actors: actors || movie.actors,
      };

      await Movie.update(updatedMovie, { where: { id } });

      return response.status(200).json({
        User: {
          id,
          tt: updatedMovie.tt,
          title: updatedMovie.title,
          director: updatedMovie.director,
          genre: updatedMovie.genre,
          actors: updatedMovie.actors,
        },
      });
    } catch (error) {
      return response.status(500).json({ error: 'Error' });
    }
  }
}
