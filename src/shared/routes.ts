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
routes.post('/movie', ensureAuthenticated, movieController.create);
routes.put('/movie/:id', ensureAuthenticated, movieController.update);
/*
routes.get('/', appointmentController.index);
routes.get('/appointment', appointmentController.index);
routes.get(
  '/appointment/User/:id',
  appointmentController.findUserAppointment,
);
routes.get(
  '/appointment/User/:id/all',
  appointmentController.findAllUserAppointment,
);
routes.post('/appointment', appointmentController.create);
routes.put('/appointment/:id', appointmentController.update);
routes.delete('/appointment/:id', appointmentController.delete); */

export default routes;
