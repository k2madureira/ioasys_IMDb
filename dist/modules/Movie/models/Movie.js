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

/* eslint-disable @typescript-eslint/explicit-function-return-type */

/* eslint-disable no-param-reassign */
class Movie extends _sequelize.Model {
  constructor(...args) {
    super(...args);
    this.id = void 0;
    this.tt = void 0;
    this.title = void 0;
    this.year = void 0;
    this.director = void 0;
    this.genre = void 0;
    this.actors = void 0;
    this.scores = void 0;
    this.createdAt = void 0;
    this.updatedAt = void 0;
  }

}

Movie.init({
  id: {
    type: _sequelize.default.NUMBER,
    primaryKey: true,
    autoIncrement: true
  },
  tt: _sequelize.default.STRING,
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