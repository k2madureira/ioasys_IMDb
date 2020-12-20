"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireWildcard(require("sequelize"));

var _database = _interopRequireDefault(require("../../../shared/database"));

var _Score = _interopRequireDefault(require("./Score"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Movie extends _sequelize.Model {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "id", void 0);

    _defineProperty(this, "tt", void 0);

    _defineProperty(this, "title", void 0);

    _defineProperty(this, "year", void 0);

    _defineProperty(this, "director", void 0);

    _defineProperty(this, "genre", void 0);

    _defineProperty(this, "actors", void 0);

    _defineProperty(this, "scores", void 0);

    _defineProperty(this, "createdAt", void 0);

    _defineProperty(this, "updatedAt", void 0);
  }

}

Movie.init({
  id: {
    type: _sequelize.default.NUMBER,
    primaryKey: true,
    autoIncrement: true
  },
  tt: {
    type: _sequelize.default.STRING,
    allowNull: false
  },
  title: _sequelize.default.STRING,
  year: _sequelize.default.STRING,
  director: _sequelize.default.STRING,
  genre: _sequelize.default.STRING,
  actors: _sequelize.default.STRING
}, {
  sequelize: _database.default.connection,
  freezeTableName: true,
  tableName: 'movies'
});
Movie.hasMany(_Score.default, {
  as: 'scores',
  foreignKey: 'movie_id'
});
var _default = Movie;
exports.default = _default;