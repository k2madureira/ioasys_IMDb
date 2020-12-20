"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _UserController = _interopRequireDefault(require("../modules/User/controllers/UserController"));

var _SessionsController = _interopRequireDefault(require("../modules/User/controllers/SessionsController"));

var _MovieController = _interopRequireDefault(require("../modules/Movie/controllers/MovieController"));

var _ensureAuthenticated = _interopRequireDefault(require("./middlewares/ensureAuthenticated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userController = new _UserController.default();
const sessionsController = new _SessionsController.default();
const movieController = new _MovieController.default();
const routes = (0, _express.Router)();
routes.post('/login', sessionsController.Authenticate);
routes.post('/user', _ensureAuthenticated.default, userController.create);
routes.put('/user/:id', _ensureAuthenticated.default, userController.update);
routes.delete('/user/:id', _ensureAuthenticated.default, userController.delete);
routes.get('/movie', movieController.list);
routes.get('/movie/:id', movieController.detail);
routes.post('/movie', _ensureAuthenticated.default, movieController.create);
routes.put('/movie/:id', _ensureAuthenticated.default, movieController.update);
routes.post('/movie/:id/vote', _ensureAuthenticated.default, movieController.vote); // Routes JEST

routes.delete('/user/jest/:id', _ensureAuthenticated.default, userController.delete_jest);
routes.delete('/movie/jest/:id', _ensureAuthenticated.default, movieController.delete_jest);
var _default = routes;
exports.default = _default;