import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'ioasysIMDb',
  username: 'postgres',
  password: 'docker',
  define: {
    timestamps: true,
    underscored: true,
  },
});

export default sequelize;
