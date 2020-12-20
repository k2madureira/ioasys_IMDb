"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../../User/models/User"));

var _Movie = _interopRequireDefault(require("../models/Movie"));

var _Score = _interopRequireDefault(require("../models/Score"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MovieController {
  async list(request, response) {
    try {
      const filter = request.query;
      const query = filter ? {
        where: filter,
        attributes: ['id', 'tt', 'title', 'year', 'director', 'genre', 'actors'],
        include: [{
          as: 'scores',
          model: _Score.default
        }]
      } : {
        attributes: ['id', 'tt', 'title', 'year', 'director', 'genre', 'actors'],
        include: [{
          as: 'scores',
          model: _Score.default
        }]
      };
      const listMovies = await _Movie.default.findAll(query);
      return response.json(listMovies);
    } catch (error) {
      return response.status(500).json({
        error: 'Error'
      });
    }
  }

  async detail(request, response) {
    try {
      const {
        id
      } = request.params;
      const listMovies = await _Movie.default.findAll({
        where: {
          id
        },
        attributes: ['id', 'tt', 'title', 'year', 'director', 'genre', 'actors'],
        include: [{
          as: 'scores',
          model: _Score.default
        }]
      });
      const [movie] = listMovies;
      const data = movie.dataValues;
      const {
        scores
      } = data;
      let sum = 0;
      let count = 0;
      scores.forEach(m => {
        sum += m.dataValues.score;
        count += 1;
      });
      const editedMovie = {
        id: data.id,
        tt: data.tt,
        title: data.title,
        year: data.year,
        director: data.director,
        actors: data.actors,
        genre: data.genre,
        total_votes: count,
        average_votes: sum / count
      };
      return response.json(editedMovie);
    } catch (error) {
      return response.status(500).json({
        error: 'Error'
      });
    }
  }

  async create(request, response) {
    try {
      const {
        tt,
        title,
        year,
        director,
        genre,
        actors
      } = request.body;
      const findAdmin = await _User.default.findOne({
        where: {
          id: request.user.id,
          admin: true
        }
      });

      if (!findAdmin) {
        return response.status(401).json({
          error: 'You need to be an administrator to register a movie'
        });
      }

      if (!tt || !title || !director || !genre) {
        return response.status(401).json({
          error: 'Please fill in the tt, title, director and genre fields.'
        });
      }

      const findMovie = await _Movie.default.findOne({
        where: {
          tt
        }
      });

      if (findMovie) {
        return response.status(401).json({
          error: 'This film has already been registered.'
        });
      }

      const newMovie = await _Movie.default.create({
        tt,
        title,
        year,
        director,
        genre,
        actors
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
          actors: newMovie.actors
        }
      };
      return response.json(responseMovie);
    } catch (error) {
      return response.status(500).json({
        error: 'Error'
      });
    }
  }

  async update(request, response) {
    try {
      const {
        tt,
        title,
        year,
        director,
        genre,
        actors
      } = request.body;
      const {
        id
      } = request.params;
      const findAdmin = await _User.default.findOne({
        where: {
          id: request.user.id,
          admin: true
        }
      });

      if (!findAdmin) {
        return response.status(401).json({
          error: 'You must be an administrator to update a movie.'
        });
      }

      const movie = await _Movie.default.findOne({
        where: {
          id
        }
      });

      if (!movie) {
        return response.status(401).json({
          error: 'Movie ID not found!'
        });
      }

      const updatedMovie = {
        tt: tt || movie.tt,
        title: title || movie.title,
        year: year || movie.year,
        director: director || movie.director,
        genre: genre || movie.genre,
        actors: actors || movie.actors
      };
      await _Movie.default.update(updatedMovie, {
        where: {
          id
        }
      });
      return response.status(200).json({
        Movie: {
          id,
          tt: updatedMovie.tt,
          title: updatedMovie.title,
          year: updatedMovie.year,
          director: updatedMovie.director,
          genre: updatedMovie.genre,
          actors: updatedMovie.actors
        }
      });
    } catch (error) {
      return response.status(500).json({
        error: 'Error'
      });
    }
  }

  async vote(request, response) {
    try {
      const {
        score
      } = request.body;
      const {
        id: movie_id
      } = request.params;
      const user_id = request.user.id;

      if (!score && score !== 0) {
        return response.status(401).json({
          error: 'Score field is required!'
        });
      }

      const movie = await _Movie.default.findOne({
        where: {
          id: movie_id
        }
      });

      if (!movie) {
        return response.status(401).json({
          error: 'Movie ID not found!'
        });
      }

      if (!Number.isInteger(score) || score < 0 || score > 4) {
        return response.status(401).json({
          error: 'Vote must be between integers, 0 and 4'
        });
      }

      await _Score.default.create({
        user_id,
        movie_id,
        score
      });
      return response.status(200).json({
        success: 'vote successfully registered'
      });
    } catch (error) {
      return response.status(500).json({
        error: 'Error'
      });
    }
  }

  async delete_jest(request, response) {
    try {
      const {
        id
      } = request.params;

      if (process.env.NODE_ENV !== 'test') {
        return response.status(401).json({
          error: 'This route is used only in test'
        });
      }

      const movie = await _Movie.default.findOne({
        where: {
          id
        }
      });

      if (!movie) {
        return response.status(401).json({
          error: 'movie ID not found!'
        });
      }

      await _Movie.default.destroy({
        where: {
          id
        }
      });
      return response.status(200).json({
        success: 'deleted'
      });
    } catch (error) {
      return response.status(500).json({
        error: 'Error'
      });
    }
  }

}

exports.default = MovieController;