"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _app = _interopRequireDefault(require("../../../shared/app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let token;
let userToken;
beforeAll(async () => {
  const admin = await (0, _supertest.default)(_app.default).post('/login').send({
    email: 'admin@admin.com',
    password: '123'
  });
  const user = await (0, _supertest.default)(_app.default).post('/login').send({
    email: 'user@user.com',
    password: '123'
  });
  token = admin.body.token;
  userToken = user.body.token;
});
describe('\n\n---------------------\n         User\n---------------------', () => {
  it('Should be able to log in', async () => {
    const login = await (0, _supertest.default)(_app.default).post('/login').send({
      email: 'admin@admin.com',
      password: '123'
    });
    expect(login.body).toHaveProperty('token');
  });
  it('Should not be able to log in with wrong Email', async () => {
    const login = await (0, _supertest.default)(_app.default).post('/login').send({
      email: 'ERROR',
      password: '123'
    });
    expect(login.body).toHaveProperty('error');
  });
  it('Should not be able to log in with wrong password', async () => {
    const login = await (0, _supertest.default)(_app.default).post('/login').send({
      email: 'admin@admin.com',
      password: 'ERROR'
    });
    expect(login.body).toHaveProperty('error');
  });
  it('Should be able create  a new user', async () => {
    const user = await (0, _supertest.default)(_app.default).post('/user').set('Authorization', `Bearer ${token}`).send({
      name: '_DUMMY_',
      nickname: '_DUM_',
      password: '_123_',
      email: '_DUMMY@DUMMY.COM_',
      admin: false
    });
    await (0, _supertest.default)(_app.default).delete(`/user/jest/${user.body.infos.id}`).set('Authorization', `Bearer ${token}`);
    expect(user.body.infos).toHaveProperty('id');
  });
  it('Should not be able create  a new user without fields', async () => {
    const user = await (0, _supertest.default)(_app.default).post('/user').set('Authorization', `Bearer ${token}`).send({
      nickname: '_DUM_',
      password: '_123_',
      email: '_DUMMY@DUMMY.COM_',
      admin: false
    });
    await (0, _supertest.default)(_app.default);
    expect(user.body).toHaveProperty('error');
  });
  it('Should not be able create  a new user with same email', async () => {
    const user = await (0, _supertest.default)(_app.default).post('/user').set('Authorization', `Bearer ${token}`).send({
      name: '_DUMMY_',
      nickname: '_DUM_',
      password: '_123_',
      email: '_DUMMY@DUMMY.COM_',
      admin: false
    });
    const user2 = await (0, _supertest.default)(_app.default).post('/user').set('Authorization', `Bearer ${token}`).send({
      name: '_DUMMY_',
      nickname: '_DUM_',
      password: '_123_',
      email: '_DUMMY@DUMMY.COM_',
      admin: false
    });
    await (0, _supertest.default)(_app.default).delete(`/user/jest/${user.body.infos.id}`).set('Authorization', `Bearer ${token}`);
    expect(user2.body).toHaveProperty('error');
  });
  it('Should not be able create  a new user if not admin', async () => {
    const user = await (0, _supertest.default)(_app.default).post('/user').set('Authorization', `Bearer ${userToken}`).send({
      nickname: '_DUM_',
      password: '_123_',
      email: '_DUMMY@DUMMY.COM_',
      admin: false
    });
    expect(user.body).toHaveProperty('error');
  });
  it('Should be able update a user', async () => {
    const user = await (0, _supertest.default)(_app.default).post('/user').set('Authorization', `Bearer ${token}`).send({
      name: '_DUMMY_',
      nickname: '_DUM_',
      password: '_123_',
      email: '_DUMMY@DUMMY.COM_',
      admin: false
    });
    const updatedUser = await (0, _supertest.default)(_app.default).put(`/user/${user.body.infos.id}`).set('Authorization', `Bearer ${token}`).send({
      name: '_DUMMYUPDATED_',
      nickname: '_DUMUPDATED_'
    });
    await (0, _supertest.default)(_app.default).delete(`/user/jest/${user.body.infos.id}`).set('Authorization', `Bearer ${token}`);
    expect(updatedUser.body.User).toHaveProperty('id');
  });
  it('Should not be able update a user with wrong id', async () => {
    const user = await (0, _supertest.default)(_app.default).post('/user').set('Authorization', `Bearer ${token}`).send({
      name: '_DUMMY_',
      nickname: '_DUM_',
      password: '_123_',
      email: '_DUMMY@DUMMY.COM_',
      admin: false
    });
    const updatedUser = await (0, _supertest.default)(_app.default).put(`/user/ERROR`).set('Authorization', `Bearer ${token}`).send({
      name: '_DUMMYUPDATED_',
      nickname: '_DUMUPDATED_'
    });
    await (0, _supertest.default)(_app.default).delete(`/user/jest/${user.body.infos.id}`).set('Authorization', `Bearer ${token}`);
    expect(updatedUser.body).toHaveProperty('error');
  });
  it('Should not be able update a user if not admin', async () => {
    const user = await (0, _supertest.default)(_app.default).post('/user').set('Authorization', `Bearer ${token}`).send({
      name: '_DUMMY_',
      nickname: '_DUM_',
      password: '_123_',
      email: '_DUMMY@DUMMY.COM_',
      admin: false
    });
    const updatedUser = await (0, _supertest.default)(_app.default).put(`/user/ERROR`).set('Authorization', `Bearer ${userToken}`).send({
      name: '_DUMMYUPDATED_',
      nickname: '_DUMUPDATED_'
    });
    await (0, _supertest.default)(_app.default).delete(`/user/jest/${user.body.infos.id}`).set('Authorization', `Bearer ${token}`);
    expect(updatedUser.body).toHaveProperty('error');
  });
  it('Should be able delete a user', async () => {
    const user = await (0, _supertest.default)(_app.default).post('/user').set('Authorization', `Bearer ${token}`).send({
      name: '_DUMMY_',
      nickname: '_DUM_',
      password: '_123_',
      email: '_DUMMY@DUMMY.COM_',
      admin: false
    });
    const deleted = await (0, _supertest.default)(_app.default).delete(`/user/${user.body.infos.id}`).set('Authorization', `Bearer ${token}`);
    await (0, _supertest.default)(_app.default).delete(`/user/jest/${user.body.infos.id}`).set('Authorization', `Bearer ${token}`);
    expect(deleted.body).toHaveProperty('success');
  });
  it('Should not be able delete a user with wrong id', async () => {
    const deleted = await (0, _supertest.default)(_app.default).delete(`/user/ERROR`).set('Authorization', `Bearer ${token}`);
    expect(deleted.body).toHaveProperty('error');
  });
  it('Should not be able delete a user if not admin', async () => {
    const deleted = await (0, _supertest.default)(_app.default).delete(`/user/ERROR`).set('Authorization', `Bearer ${userToken}`);
    expect(deleted.body).toHaveProperty('error');
  });
});