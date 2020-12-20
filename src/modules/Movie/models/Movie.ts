/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-param-reassign */
import Sequelize, { Model } from 'sequelize';
import database from '@shared/database';

import Score from './Score';

class Movie extends Model {
  public id!: number;

  public tt!: string;

  public title!: string;

  public year!: string;

  public director!: string;

  public genre!: string;

  public actors!: string;

  public scores: [
    {
      id: number;
      user_id: number;
      movie_id: number;
      score: number;
      createdAt: Date;
      updatedAt: Date;
    },
  ];

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

Movie.init(
  {
    id: {
      type: Sequelize.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    tt: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    title: Sequelize.STRING,
    year: Sequelize.STRING,
    director: Sequelize.STRING,
    genre: Sequelize.STRING,
    actors: Sequelize.STRING,
  },
  {
    sequelize: database.connection,
    freezeTableName: true,
    tableName: 'movies',
  },
);

Movie.hasMany(Score, {
  as: 'scores',
  foreignKey: 'movie_id',
});

export default Movie;
