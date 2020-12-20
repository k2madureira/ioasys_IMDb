/* eslint-disable no-param-reassign */
import Sequelize, { Model } from 'sequelize';
import { compare, hash } from 'bcryptjs';
import database from '@shared/database';

class User extends Model {
  [x: string]: any;

  public id!: number;

  public name!: string;

  public nickname!: string;

  public email!: string;

  public password!: string;

  public passwordHash!: string;

  public admin!: boolean;

  public disabled!: boolean;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public async checkPassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}

User.init(
  {
    id: {
      type: Sequelize.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: Sequelize.STRING,
    nickname: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.VIRTUAL,
    passwordHash: Sequelize.STRING,
    admin: Sequelize.BOOLEAN,
    disabled: Sequelize.BOOLEAN,
  },
  {
    sequelize: database.connection,
    freezeTableName: true,
    tableName: 'users',
  },
);

User.addHook(
  'beforeSave',
  async (user: User): Promise<void> => {
    const userData = user.dataValues;
    if (userData.password) {
      user.dataValues.passwordHash = await hash(userData.password, 8);
    }
  },
);

User.addHook(
  'beforeUpdate',
  async (user: User): Promise<void> => {
    const userData = user.dataValues;
    if (userData.password) {
      user.dataValues.passwordHash = await hash(userData.password, 8);
    }
  },
);

export default User;
