"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuidv = require("uuidv4");

class Appointment {
  constructor() {
    this.appointments = [];
    this.path = void 0;
    this.appointments = [{
      id: '_APPOINTMENTID_',
      name: '_NAME_',
      species: '_SPECIES_',
      breed: '_BREED_',
      medic_id: '_MEDICID_',
      specialty_id: '_SPECIALTYID_',
      urgent: false,
      status: 'Atendido',
      created_at: new Date(),
      updated_at: new Date()
    }];
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
    const Index = this.appointments.findIndex(find => find.id === id);
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
    };
    this.appointments[Index] = appointment;
    return appointment;
  }

  async delete(id) {
    const Index = this.appointments.findIndex(find => find.id === id);
    this.appointments.splice(Index, 1);
  }

}

exports.default = Appointment;