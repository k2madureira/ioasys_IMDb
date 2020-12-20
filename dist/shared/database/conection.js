"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

const sequelize = new _sequelize.Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'ioasysIMDb',
  username: 'postgres',
  password: 'docker',
  define: {
    timestamps: true,
    underscored: true
  }
});
var _default = sequelize;
exports.default = _default;