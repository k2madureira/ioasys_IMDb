/* eslint-disable no-param-reassign */
import Sequelize, { Model } from 'sequelize';
import database from '@shared/database';

class Movie extends Model {
  public id!: number;

  public tt!: string;

  public title!: string;

  public director!: string;

  public genre!: string;

  public actors!: string;

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
    tt: Sequelize.STRING,
    title: Sequelize.STRING,
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

export default Movie;
