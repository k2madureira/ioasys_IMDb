"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireWildcard(require("sequelize"));

var _bcryptjs = require("bcryptjs");

var _database = _interopRequireDefault(require("../../../shared/database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class User extends _sequelize.Model {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "id", void 0);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "nickname", void 0);

    _defineProperty(this, "email", void 0);

    _defineProperty(this, "password", void 0);

    _defineProperty(this, "passwordHash", void 0);

    _defineProperty(this, "admin", void 0);

    _defineProperty(this, "disabled", void 0);

    _defineProperty(this, "createdAt", void 0);

    _defineProperty(this, "updatedAt", void 0);
  }

  async checkPassword(password) {
    return (0, _bcryptjs.compare)(password, this.passwordHash);
  }

}

User.init({
  id: {
    type: _sequelize.default.NUMBER,
    primaryKey: true,
    autoIncrement: true
  },
  name: _sequelize.default.STRING,
  nickname: _sequelize.default.STRING,
  email: _sequelize.default.STRING,
  password: _sequelize.default.VIRTUAL,
  passwordHash: _sequelize.default.STRING,
  admin: _sequelize.default.BOOLEAN,
  disabled: _sequelize.default.BOOLEAN
}, {
  sequelize: _database.default.connection,
  freezeTableName: true,
  tableName: 'users'
});
User.addHook('beforeSave', async user => {
  if (user.password) {
    user.passwordHash = await (0, _bcryptjs.hash)(user.password, 8);
  }
});
User.addHook('beforeUpdate', async user => {
  if (user.password) {
    user.passwordHash = await (0, _bcryptjs.hash)(user.password, 8);
  }
});
var _default = User;
exports.default = _default;