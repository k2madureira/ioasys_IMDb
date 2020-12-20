"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = require("jsonwebtoken");

var _auth = _interopRequireDefault(require("../../../config/auth"));

var _bcryptjs = require("bcryptjs");

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SessionsController {
  async Authenticate(request, response) {
    const {
      email,
      password
    } = request.body;
    const user = await _User.default.findOne({
      where: {
        email
      }
    });

    if (!user) {
      return response.status(401).json({
        error: 'Email not registered.'
      });
    }

    const userData = user.dataValues;
    const passwordMatched = await (0, _bcryptjs.compare)(password, userData.passwordHash);

    if (!passwordMatched) {
      return response.status(401).json({
        error: 'Incorrect password.'
      });
    }

    const {
      secret,
      expiresIn
    } = _auth.default.jwt;
    const token = (0, _jsonwebtoken.sign)({}, secret, {
      subject: userData.id.toString(),
      expiresIn
    });
    const res = {
      user: {
        name: userData.name,
        email: userData.email
      },
      token
    };
    return response.json(res);
  }

}

exports.default = SessionsController;