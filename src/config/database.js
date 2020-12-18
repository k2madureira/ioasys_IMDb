require('dotenv/config');

module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  define: {
    timestamps: true,
  },
  logging: false,
};

/* module.exports = {
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
};
*/
