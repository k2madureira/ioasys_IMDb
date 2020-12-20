"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireWildcard(require("sequelize"));

var _database = _interopRequireDefault(require("../../../shared/database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import User from '@modules/User/models/User';
// import Movie from './Movie';
class Score extends _sequelize.Model {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "id", void 0);

    _defineProperty(this, "user_id", void 0);

    _defineProperty(this, "movie_id", void 0);

    _defineProperty(this, "score", void 0);

    _defineProperty(this, "createdAt", void 0);

    _defineProperty(this, "updatedAt", void 0);
  }

}

Score.init({
  id: {
    type: _sequelize.default.NUMBER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: _sequelize.default.NUMBER,
  movie_id: _sequelize.default.NUMBER,
  score: _sequelize.default.NUMBER
}, {
  sequelize: _database.default.connection,
  freezeTableName: true,
  tableName: 'scores'
});
var _default = Score;
exports.default = _default;