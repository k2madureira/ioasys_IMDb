import { Router } from 'express';

import UserController from '@modules/User/controllers/UserController';
import SessionsController from '@modules/User/controllers/SessionsController';
import MovieController from '@modules/Movie/controllers/MovieController';

import ensureAuthenticated from '@shared/middlewares/ensureAuthenticated';

const userController = new UserController();
const sessionsController = new SessionsController();
const movieController = new MovieController();

const routes = Router();

routes.post('/login', sessionsController.Authenticate);
routes.post('/user', ensureAuthenticated, userController.create);
routes.put('/user/:id', ensureAuthenticated, userController.update);
routes.delete('/user/:id', ensureAuthenticated, userController.delete);

routes.get('/movie', movieController.list);
routes.get('/movie/:id', movieController.detail);
routes.post('/movie', ensureAuthenticated, movieController.create);
routes.put('/movie/:id', ensureAuthenticated, movieController.update);

routes.post('/movie/:id/vote', ensureAuthenticated, movieController.vote);

export default routes;
