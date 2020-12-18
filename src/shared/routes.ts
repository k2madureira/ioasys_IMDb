import { Router } from 'express';

import UserController from '@modules/User/controllers/UserController';
import SessionsController from '@modules/User/controllers/SessionsController';
// import AppointmentController from '@modules/Appointment/controllers/AppointmentController';

import ensureAuthenticated from '@shared/middlewares/ensureAuthenticated';

const userController = new UserController();
const sessionsController = new SessionsController();
// const appointmentController = new AppointmentController();

const routes = Router();

routes.post('/login', sessionsController.Authenticate);
routes.post('/user', ensureAuthenticated, userController.create);
routes.put('/user/:id', ensureAuthenticated, userController.update);
routes.delete('/user/:id', ensureAuthenticated, userController.delete);
/* routes.get('/User', UserController.index);
routes.put('/User/:id', UserController.update);
routes.delete('/User/:id', UserController.delete);

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
