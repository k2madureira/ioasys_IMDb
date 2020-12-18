"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _app = _interopRequireDefault(require("../../../shared/app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Appointment', () => {
  it('Should be able create  a new appointment', async () => {
    const appointment = await (0, _supertest.default)(_app.default).post('/appointment').send({
      name: '_NAME_',
      species: '_SPECIES_',
      breed: '_BREED_',
      medic_id: '_MEDICID_',
      specialty_id: '_SPECIALTYID_',
      urgent: false,
      status: 'Atendido',
      created_at: new Date(),
      updated_at: new Date()
    });
    expect(appointment.body).toHaveProperty('id');
  });
  it('Should be able create  a new appointment without [medic_id]', async () => {
    const appointment = await (0, _supertest.default)(_app.default).post('/appointment').send({
      name: '_NAME_',
      species: '_SPECIES_',
      breed: '_BREED_',
      specialty_id: '_SPECIALTYID_',
      urgent: false,
      status: 'Atendido',
      created_at: new Date(),
      updated_at: new Date()
    });
    expect(appointment.body).toHaveProperty('id');
  });
  it('Should be able create  a new appointment with wrong [urgent: boolean]', async () => {
    const appointment = await (0, _supertest.default)(_app.default).post('/appointment').send({
      name: '_NAME_',
      species: '_SPECIES_',
      breed: '_BREED_',
      specialty_id: '_SPECIALTYID_',
      urgent: '_WRONG_',
      status: 'Atendido',
      created_at: new Date(),
      updated_at: new Date()
    });
    expect(appointment.body).toHaveProperty('id');
  });
  it('Should not be able to create a new appointment, with wrong specialty_id', async () => {
    const appointment = await (0, _supertest.default)(_app.default).post('/appointment').send({
      name: '_NAME_',
      species: '_SPECIES_',
      breed: '_BREED_',
      medic_id: '_MEDICID_',
      specialty_id: '_WRONG_',
      urgent: false,
      status: 'Atendido',
      created_at: new Date(),
      updated_at: new Date()
    });
    expect(appointment.body).toHaveProperty('error');
  });
  it('Should not be able to create a new appointment, without [name]', async () => {
    const appointment = await (0, _supertest.default)(_app.default).post('/appointment').send({
      species: '_SPECIES_',
      breed: '_BREED_',
      medic_id: '_MEDICID_',
      specialty_id: '_SPECIALTYID_',
      urgent: false,
      status: 'Atendido',
      created_at: new Date(),
      updated_at: new Date()
    });
    expect(appointment.body).toHaveProperty('error');
  });
  it('Should not be able to create a new appointment, with wrong [status]', async () => {
    const appointment = await (0, _supertest.default)(_app.default).post('/appointment').send({
      name: '_NAME_',
      species: '_SPECIES_',
      breed: '_BREED_',
      medic_id: '_MEDICID_',
      specialty_id: '_SPECIALTYID_',
      urgent: false,
      status: '_WRONG_',
      created_at: new Date(),
      updated_at: new Date()
    });
    expect(appointment.body).toHaveProperty('error');
  });
  /* ----------
   *  UPDATE
   -----------*/

  it('Should be able update  a appointment', async () => {
    const appointment = await (0, _supertest.default)(_app.default).put('/appointment/_APPOINTMENTID_').send({
      name: '_NAME_',
      species: '_SPECIES_',
      breed: '_BREED_',
      medic_id: '_MEDICID_',
      specialty_id: '_SPECIALTYID_',
      urgent: false,
      status: 'Atendido',
      created_at: new Date(),
      updated_at: new Date()
    });
    expect(appointment.body).toHaveProperty('id');
  });
  it('Should be able to update a appointment, with missing fields', async () => {
    const appointment = await (0, _supertest.default)(_app.default).put('/appointment/_APPOINTMENTID_').send({
      created_at: new Date(),
      updated_at: new Date()
    });
    expect(appointment.body).toHaveProperty('id');
  });
  it('Should be able to update a appointment, with wrong field [urgent]', async () => {
    const appointment = await (0, _supertest.default)(_app.default).put('/appointment/_APPOINTMENTID_').send({
      medic_id: '_MEDICID_',
      urgent: '_WRONG_',
      created_at: new Date(),
      updated_at: new Date()
    });
    expect(appointment.body).toHaveProperty('id');
  });
  it('Should be able update a appointment with wrong [urgent: boolean]', async () => {
    const appointment = await (0, _supertest.default)(_app.default).put('/appointment/_APPOINTMENTID_').send({
      name: '_NAME_',
      species: '_SPECIES_',
      breed: '_BREED_',
      specialty_id: '_SPECIALTYID_',
      urgent: '_WRONG_',
      status: 'Atendido',
      created_at: new Date(),
      updated_at: new Date()
    });
    expect(appointment.body).toHaveProperty('id');
  });
  it('Should not be able to update a appointment, with wrong ID', async () => {
    const appointment = await (0, _supertest.default)(_app.default).put('/appointment/_WRONG_').send({
      species: '_SPECIES_',
      breed: '_BREED_',
      medic_id: '_MEDICID_',
      specialty_id: '_SPECIALTYID_',
      urgent: false,
      status: 'Atendido',
      created_at: new Date(),
      updated_at: new Date()
    });
    expect(appointment.body).toHaveProperty('error');
  });
  it('Should not be able to update a appointment, with wrong [status]', async () => {
    const appointment = await (0, _supertest.default)(_app.default).put('/appointment/_APPOINTMENTID_').send({
      name: '_NAME_',
      species: '_SPECIES_',
      breed: '_BREED_',
      medic_id: '_MEDICID_',
      specialty_id: '_SPECIALTYID_',
      urgent: false,
      status: '_WRONG_',
      created_at: new Date(),
      updated_at: new Date()
    });
    expect(appointment.body).toHaveProperty('error');
  });
  it('Should be able to delete appointment', async () => {
    const appointment = await (0, _supertest.default)(_app.default).delete('/appointment/_APPOINTMENTID_');
    expect(appointment.body).toHaveProperty('success');
  });
  it('Should not be able to delete appointment with wrong ID', async () => {
    const appointment = await (0, _supertest.default)(_app.default).delete('/appointment/_WRONG_');
    expect(appointment.body).toHaveProperty('error');
  });
  it('Should be able to list appointment', async () => {
    const appointment = await (0, _supertest.default)(_app.default).get('/appointment');
    expect(appointment.body).toHaveProperty('appointments');
  });
  it('Should be able to find one appointment for a medic', async () => {
    const appointment = await (0, _supertest.default)(_app.default).get('/appointment/medic/_MEDICID_');
    expect(appointment.body).toHaveProperty('appointment');
  });
  it('Should not be able find one appointment for a medic, with wrong ID', async () => {
    const appointment = await (0, _supertest.default)(_app.default).get('/appointment/medic/_WRONG_');
    expect(appointment.body).toHaveProperty('error');
  });
  it('Should be able to list all appointments for a medic', async () => {
    const appointment = await (0, _supertest.default)(_app.default).get('/appointment/medic/_MEDICID_/all');
    expect(appointment.body).toHaveProperty('appointments');
  });
  it('Should not be able to list all appointments for a medic, with wrong ID', async () => {
    const appointment = await (0, _supertest.default)(_app.default).get('/appointment/medic/_WRONG_/all');
    expect(appointment.body).toHaveProperty('error');
  });
});