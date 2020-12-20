require('dotenv/config');

module.exports = {
  dialect: 'postgres',
  host:
    process.env.NODE_ENV === 'test'
      ? process.env.DB_HOST_JEST
      : process.env.DB_HOST,
  username:
    process.env.NODE_ENV === 'test'
      ? process.env.DB_USER_JEST
      : process.env.DB_USER,
  password:
    process.env.NODE_ENV === 'test'
      ? process.env.DB_PASS_JEST
      : process.env.DB_PASS,
  database:
    process.env.NODE_ENV === 'test'
      ? process.env.DB_NAME_JEST
      : process.env.DB_NAME,
  port:
    process.env.NODE_ENV === 'test'
      ? process.env.DB_PORT_JEST
      : process.env.DB_PORT,
  define: {
    timestamps: true,
  },
  logging: false,
};
