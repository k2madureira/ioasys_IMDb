/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Sequelize from 'sequelize';

import databaseConfig from '../../config/database.js';

class Database {
  public connection: Sequelize.Sequelize;

  public database: string;

  public port: number;

  public dialect:
    | 'postgres'
    | 'mysql'
    | 'sqlite'
    | 'mariadb'
    | 'mssql'
    | undefined;

  public host?: string;

  public username: string;

  public password: string;

  constructor() {
    this.init();
    this.database = databaseConfig.database || 'ioasysIMDb';
    this.dialect = 'postgres';
    this.port = Number.parseInt(databaseConfig.port!) || 5432;
    this.host = databaseConfig.host || 'localhost';
    this.username = databaseConfig.username || 'postgres';
    this.password = databaseConfig.password || 'docker';
  }

  init(): void {
    this.dialect = 'postgres';

    const { database, username, password, host } = databaseConfig;
    const port = Number.parseInt(databaseConfig.port!);

    this.connection = new Sequelize.Sequelize({
      username,
      password,
      database,
      host,
      dialect: this.dialect,
      port,
      define: {
        timestamps: true,
      },
      logging: false,
    });
  }
}

const database: Database = new Database();

export default database;
