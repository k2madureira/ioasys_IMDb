"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _app = _interopRequireDefault(require("../../../shared/app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Specialty', () => {
  it('Should be able create  a new specialty', async () => {
    const specialty = await (0, _supertest.default)(_app.default).post('/specialty').send({
      description: '_DESCRIPTION_'
    });
    await (0, _supertest.default)(_app.default).delete(`/specialty/${specialty.body.id}`);
    expect(specialty.body).toHaveProperty('id');
  });
  it('Should not be able to create a new specialty, with empty description', async () => {
    const specialty = await (0, _supertest.default)(_app.default).post('/specialty').send({
      description: ''
    });
    expect(specialty.body).toHaveProperty('error');
  });
  it('Should be able to update an specialty, with description', async () => {
    const specialty = await (0, _supertest.default)(_app.default).put('/specialty/_SPECIALTYID_').send({
      description: '_UPDATED_'
    });
    expect(specialty.body).toHaveProperty('id');
  });
  it('Should not be able to update an specialty, without description', async () => {
    const specialty = await (0, _supertest.default)(_app.default).put('/specialty/_SPECIALTYID_').send({
      description: ''
    });
    expect(specialty.body).toHaveProperty('error');
  });
  it('Should not be able to update an specialty, with wrong ID', async () => {
    const specialty = await (0, _supertest.default)(_app.default).put('/specialty/_WRONG_').send({
      description: ''
    });
    expect(specialty.body).toHaveProperty('error');
  });
  it('Should be able to delete a specialty', async () => {
    const specialty_2 = await (0, _supertest.default)(_app.default).delete('/specialty/_SPECIALTYID_');
    expect(specialty_2.body).toHaveProperty('success');
  });
  it('Should not be able to create a duplicate specialty', async () => {
    const specialty_2 = await (0, _supertest.default)(_app.default).post('/specialty').send({
      description: '_DESCRIPTION_'
    }).send({
      description: '_REPEAT_'
    });
    expect(specialty_2.body).toHaveProperty('error');
  });
  it('Should  be able to list specialtys', async () => {
    const specialtys = await (0, _supertest.default)(_app.default).get('/specialty');
    expect(specialtys.body).toHaveProperty('specialtys');
  });
});