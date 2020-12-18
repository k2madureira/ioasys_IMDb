"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _MedicController = _interopRequireDefault(require("../modules/Medic/controllers/MedicController"));

var _AppointmentController = _interopRequireDefault(require("../modules/Appointment/controllers/AppointmentController"));

var _SpecialtyController = _interopRequireDefault(require("../modules/Specialty/controllers/SpecialtyController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const medicController = new _MedicController.default();
const appointmentController = new _AppointmentController.default();
const specialtyController = new _SpecialtyController.default();
const routes = (0, _express.Router)();
routes.post('/medic', medicController.create);
routes.get('/medic', medicController.index);
routes.put('/medic/:id', medicController.update);
routes.delete('/medic/:id', medicController.delete);
routes.get('/', appointmentController.index);
routes.get('/appointment', appointmentController.index);
routes.get('/appointment/medic/:id', appointmentController.findMedicAppointment);
routes.get('/appointment/medic/:id/all', appointmentController.findAllMedicAppointment);
routes.post('/appointment', appointmentController.create);
routes.put('/appointment/:id', appointmentController.update);
routes.delete('/appointment/:id', appointmentController.delete);
routes.get('/specialty', specialtyController.index);
routes.post('/specialty', specialtyController.create);
routes.put('/specialty/:id', specialtyController.update);
routes.delete('/specialty/:id', specialtyController.delete);
var _default = routes;
exports.default = _default;