"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = require("bcryptjs");

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserController {
  async create(request, response) {
    try {
      const {
        name,
        email,
        nickname,
        password,
        admin = false
      } = request.body;
      const findAdmin = await _User.default.findOne({
        where: {
          id: request.user.id,
          admin: true
        }
      });

      if (!findAdmin && admin === true) {
        return response.status(401).json({
          error: 'You must be an administrator to register a user at the same level.'
        });
      }

      if (!name || !email || !password) {
        return response.status(401).json({
          error: 'Please fill in the name, email and password fields.'
        });
      }

      const findEmail = await _User.default.findOne({
        where: {
          email
        }
      });

      if (findEmail) {
        return response.status(401).json({
          error: 'This email has already been registered'
        });
      }

      const newUser = await _User.default.create({
        name,
        email,
        nickname,
        password,
        admin,
        disabled: 0
      });
      const userData = newUser.dataValues;
      const responseUser = {
        message: 'User successfully registered',
        infos: {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          nickname: userData.nickname
        }
      };
      return response.json(responseUser);
    } catch (error) {
      return response.status(500).json({
        error: 'Error'
      });
    }
  }

  async update(request, response) {
    try {
      const {
        name,
        email,
        nickname,
        password,
        admin = false
      } = request.body;
      const {
        id
      } = request.params;
      const findAdmin = await _User.default.findOne({
        where: {
          id: request.user.id,
          admin: true
        }
      });

      if (!findAdmin && admin === true) {
        return response.status(401).json({
          error: 'You must be an administrator to update a user at the same level.'
        });
      }

      const userObj = await _User.default.findOne({
        where: {
          id
        }
      });

      if (!userObj) {
        return response.status(401).json({
          error: 'User ID not found!'
        });
      }

      const user = userObj.dataValues;
      let newHash = '';
      let compareHash = false;

      if (password) {
        newHash = await (0, _bcryptjs.hash)(password, 8);
        compareHash = await (0, _bcryptjs.compare)(password, user.passwordHash);
      }

      const passwordUpdated = !compareHash ? user.passwordHash : newHash;
      const updatedUser = {
        name: name || user.name,
        email: email || user.email,
        nickname: nickname || user.nickname,
        passwordHash: passwordUpdated,
        admin: admin || user.admin
      };
      await _User.default.update(updatedUser, {
        where: {
          id
        }
      });
      return response.status(200).json({
        User: {
          id,
          name: updatedUser.name,
          email: updatedUser.email,
          nickname: updatedUser.nickname,
          admin: updatedUser.admin
        }
      });
    } catch (error) {
      return response.status(500).json({
        error: 'Error'
      });
    }
  }

  async delete(request, response) {
    try {
      const {
        id
      } = request.params;
      const findAdmin = await _User.default.findOne({
        where: {
          id: request.user.id,
          admin: true
        }
      });

      if (!findAdmin) {
        return response.status(401).json({
          error: 'You must be an administrator to delete a user .'
        });
      }

      const user = await _User.default.findOne({
        where: {
          id
        }
      });

      if (!user) {
        return response.status(401).json({
          error: 'User ID not found!'
        });
      }

      await _User.default.update({
        disabled: true
      }, {
        where: {
          id
        }
      });
      return response.status(200).json({
        success: 'deleted'
      });
    } catch (error) {
      return response.status(500).json({
        error: 'Error'
      });
    }
  }

  async delete_jest(request, response) {
    try {
      const {
        id
      } = request.params;

      if (process.env.NODE_ENV !== 'test') {
        return response.status(401).json({
          error: 'This route is used only in test'
        });
      }

      const user = await _User.default.findOne({
        where: {
          id
        }
      });

      if (!user) {
        return response.status(401).json({
          error: 'User ID not found!'
        });
      }

      await _User.default.destroy({
        where: {
          id
        }
      });
      return response.status(200).json({
        success: 'deleted'
      });
    } catch (error) {
      return response.status(500).json({
        error: 'Error'
      });
    }
  }

}

exports.default = UserController;