import request from 'supertest';
import app from '@shared/app';

describe('Medic', () => {
  it('Should be able create  a new medic', async () => {
    const medic = await request(app)
      .post('/medic')
      .send({ name: '_MEDIC_', specialty_id: '_SPECIALTYID_' });

    expect(medic.body).toHaveProperty('id');
  });

  it('Should not be able to create a new medic, with empty fields', async () => {
    const medic_1 = await request(app).post('/medic').send({ name: '' });
    const medic_2 = await request(app)
      .post('/medic')
      .send({ specialty_id: '' });

    expect(medic_1.body).toHaveProperty('error');
    expect(medic_2.body).toHaveProperty('error');
  });

  it('Should not be able to create a new medic, with wrong specialty_id', async () => {
    const medic = await request(app)
      .post('/medic')
      .send({ name: '_NAME_', specialty_id: '_WRONG_' });

    expect(medic.body).toHaveProperty('error');
  });

  it('Should be able to update medic by id', async () => {
    const medic = await request(app)
      .put('/medic/_MEDICID_')
      .send({ name: '_UPDATED_' });
    expect(medic.body).toHaveProperty('id');
  });

  it('Should not be able to update medic by wrong id', async () => {
    const medic = await request(app)
      .put('/medic/_WRONG_')
      .send({ name: '_UPDATED_' });
    expect(medic.body).toHaveProperty('error');
  });
  it('Should be able to delete medic', async () => {
    const medic = await request(app).delete('/medic/_MEDICID_');
    expect(medic.body).toHaveProperty('success');
  });

  it('Should not be able to delete medic with wrong ID', async () => {
    const medic = await request(app).delete('/medic/_WRONG_');
    expect(medic.body).toHaveProperty('error');
  });

  it('Should be able to list medics', async () => {
    const medics = await request(app).get('/medic');

    expect(medics.body).toHaveProperty('medics');
  });
});
