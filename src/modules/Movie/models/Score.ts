/* eslint-disable no-param-reassign */
import Sequelize, { Model } from 'sequelize';
import database from '@shared/database';

class Score extends Model {
  public id!: number;

  public user_id!: number;

  public movie_id!: number;

  public score!: number;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

Score.init(
  {
    id: {
      type: Sequelize.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: Sequelize.NUMBER,
    movie_id: Sequelize.NUMBER,
    score: Sequelize.NUMBER,
  },
  {
    sequelize: database.connection,
    freezeTableName: true,
    tableName: 'scores',
  },
);

export default Score;
