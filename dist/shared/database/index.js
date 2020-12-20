"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = _interopRequireDefault(require("../../config/database.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Database {
  constructor() {
    _defineProperty(this, "connection", void 0);

    _defineProperty(this, "database", void 0);

    _defineProperty(this, "port", void 0);

    _defineProperty(this, "dialect", void 0);

    _defineProperty(this, "host", void 0);

    _defineProperty(this, "username", void 0);

    _defineProperty(this, "password", void 0);

    this.init();
    this.database = _database.default.database || 'ioasysIMDb';
    this.dialect = 'postgres';
    this.port = Number.parseInt(_database.default.port) || 5432;
    this.host = _database.default.host || 'localhost';
    this.username = _database.default.username || 'postgres';
    this.password = _database.default.password || 'docker';
  }

  init() {
    this.dialect = 'postgres';
    const {
      database,
      username,
      password,
      host
    } = _database.default;
    const port = Number.parseInt(_database.default.port);
    this.connection = new _sequelize.default.Sequelize({
      username,
      password,
      database,
      host,
      dialect: this.dialect,
      port,
      define: {
        timestamps: true
      },
      logging: false
    });
  }

}

const database = new Database();
var _default = database;
exports.default = _default;