"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _app = _interopRequireDefault(require("../../../shared/app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Medic', () => {
  it('Should be able create  a new medic', async () => {
    const medic = await (0, _supertest.default)(_app.default).post('/medic').send({
      name: '_MEDIC_',
      specialty_id: '_SPECIALTYID_'
    });
    expect(medic.body).toHaveProperty('id');
  });
  it('Should not be able to create a new medic, with empty fields', async () => {
    const medic_1 = await (0, _supertest.default)(_app.default).post('/medic').send({
      name: ''
    });
    const medic_2 = await (0, _supertest.default)(_app.default).post('/medic').send({
      specialty_id: ''
    });
    expect(medic_1.body).toHaveProperty('error');
    expect(medic_2.body).toHaveProperty('error');
  });
  it('Should not be able to create a new medic, with wrong specialty_id', async () => {
    const medic = await (0, _supertest.default)(_app.default).post('/medic').send({
      name: '_NAME_',
      specialty_id: '_WRONG_'
    });
    expect(medic.body).toHaveProperty('error');
  });
  it('Should be able to update medic by id', async () => {
    const medic = await (0, _supertest.default)(_app.default).put('/medic/_MEDICID_').send({
      name: '_UPDATED_'
    });
    expect(medic.body).toHaveProperty('id');
  });
  it('Should not be able to update medic by wrong id', async () => {
    const medic = await (0, _supertest.default)(_app.default).put('/medic/_WRONG_').send({
      name: '_UPDATED_'
    });
    expect(medic.body).toHaveProperty('error');
  });
  it('Should be able to delete medic', async () => {
    const medic = await (0, _supertest.default)(_app.default).delete('/medic/_MEDICID_');
    expect(medic.body).toHaveProperty('success');
  });
  it('Should not be able to delete medic with wrong ID', async () => {
    const medic = await (0, _supertest.default)(_app.default).delete('/medic/_WRONG_');
    expect(medic.body).toHaveProperty('error');
  });
  it('Should be able to list medics', async () => {
    const medics = await (0, _supertest.default)(_app.default).get('/medic');
    expect(medics.body).toHaveProperty('medics');
  });
});