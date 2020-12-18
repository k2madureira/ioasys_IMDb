"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuidv = require("uuidv4");

var _path = require("path");

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Appointment {
  constructor() {
    this.appointments = [];
    this.path = void 0;
    this.appointments = [];
    this.path = (0, _path.resolve)(__dirname, '..', '..', '..', 'shared', 'database', 'appointments.json');
    this.loadJson();
  }

  loadJson() {
    const data = _fs.default.readFileSync(this.path);

    this.appointments = JSON.parse(data.toString());
  }

  async list() {
    return this.appointments.sort((a, b) => {
      return a.urgent < b.urgent ? 1 : -1;
    });
  }

  async listById(id) {
    return this.appointments.filter(medic => medic.id === id).sort((a, b) => {
      return a.urgent < b.urgent ? 1 : -1;
    });
  }

  async create({
    name,
    species,
    breed,
    specialty_id,
    medic_id,
    urgent,
    status,
    created_at,
    updated_at
  }) {
    const appointment = {
      id: (0, _uuidv.uuid)(),
      name,
      species,
      breed,
      specialty_id,
      medic_id,
      urgent,
      status: status || 'Pendente',
      created_at,
      updated_at
    };
    this.appointments.push(appointment);

    _fs.default.writeFileSync(this.path, JSON.stringify(this.appointments, null, 2));

    return appointment;
  }

  async update({
    id,
    name,
    species,
    breed,
    specialty_id,
    medic_id,
    urgent,
    status,
    created_at,
    updated_at
  }) {
    const Index = this.appointments.findIndex(find => find.id === id); // const updatedAppointment = this.appointments[Index];

    const appointment = {
      id,
      name,
      species,
      breed,
      specialty_id,
      medic_id,
      urgent,
      status,
      created_at,
      updated_at
    }; // updatedAppointment.status = 'Atendido';

    this.appointments[Index] = appointment;

    _fs.default.writeFileSync(this.path, JSON.stringify(this.appointments, null, 2));

    return appointment;
  }

  async delete(id) {
    const Index = this.appointments.findIndex(find => find.id === id);
    this.appointments.splice(Index, 1);

    _fs.default.writeFileSync(this.path, JSON.stringify(this.appointments, null, 2));
  }

}

exports.default = Appointment;