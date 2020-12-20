import request from 'supertest';
import app from '@shared/app';

let token: string;
let userToken: string;

beforeAll(async () => {
  const admin = await request(app)
    .post('/login')
    .send({ email: 'admin@admin.com', password: '123' });

  const user = await request(app)
    .post('/login')
    .send({ email: 'user@user.com', password: '123' });

  token = admin.body.token;
  userToken = user.body.token;
});

describe('\n\n---------------------\n         Movie\n---------------------', () => {
  it('Should be able create  a new movie', async () => {
    const movie = await request(app)
      .post('/movie')
      .set('Authorization', `Bearer ${token}`)
      .send({
        tt: '_DUMMY MOVIE_',
        title: '_DUMMY MOVIE_',
        director: '_DUMMY MOVIE_',
        genre: '_DUMMY MOVIE_',
        actors: '_DUMMY MOVIE_',
      });

    await request(app)
      .delete(`/movie/jest/${movie.body.infos.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(movie.body.infos).toHaveProperty('id');
  });

  it('Should not be able create  a new movie without fields', async () => {
    const movie = await request(app)
      .post('/movie')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: '_DUMMY MOVIE_',
        director: '_DUMMY MOVIE_',
        genre: '_DUMMY MOVIE_',
        actors: '_DUMMY MOVIE_',
      });

    await request(app);

    expect(movie.body).toHaveProperty('error');
  });

  it('Should not be able create  a new movie with same tt', async () => {
    const movie = await request(app)
      .post('/movie')
      .set('Authorization', `Bearer ${token}`)
      .send({
        tt: '_DUMMY MOVIE_',
        title: '_DUMMY MOVIE_',
        director: '_DUMMY MOVIE_',
        genre: '_DUMMY MOVIE_',
        actors: '_DUMMY MOVIE_',
      });

    const movie2 = await request(app)
      .post('/movie')
      .set('Authorization', `Bearer ${token}`)
      .send({
        tt: '_DUMMY MOVIE_',
        title: '_DUMMY MOVIE_',
        director: '_DUMMY MOVIE_',
        genre: '_DUMMY MOVIE_',
        actors: '_DUMMY MOVIE_',
      });

    await request(app)
      .delete(`/movie/jest/${movie.body.infos.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(movie2.body).toHaveProperty('error');
  });

  it('Should not be able create  a new movie if not admin', async () => {
    const movie = await request(app)
      .post('/movie')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        tt: '_DUMMY MOVIE_',
        title: '_DUMMY MOVIE_',
        director: '_DUMMY MOVIE_',
        genre: '_DUMMY MOVIE_',
        actors: '_DUMMY MOVIE_',
      });

    expect(movie.body).toHaveProperty('error');
  });

  it('Should be able update a movie', async () => {
    const movie = await request(app)
      .post('/movie')
      .set('Authorization', `Bearer ${token}`)
      .send({
        tt: '_DUMMY MOVIE_',
        title: '_DUMMY MOVIE_',
        director: '_DUMMY MOVIE_',
        genre: '_DUMMY MOVIE_',
        actors: '_DUMMY MOVIE_',
      });

    const updatedMovie = await request(app)
      .put(`/movie/${movie.body.infos.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: '_DUMMY MOVIE_UPDATED_',
        director: '_DUMMY MOVIE_',
        genre: '_DUMMY MOVIE_',
        actors: '_DUMMY MOVIE_',
      });

    await request(app)
      .delete(`/movie/jest/${movie.body.infos.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(updatedMovie.body.Movie).toHaveProperty('id');
  });

  it('Should not be able update a movie with wrong id', async () => {
    const movie = await request(app)
      .post('/movie')
      .set('Authorization', `Bearer ${token}`)
      .send({
        tt: '_DUMMY MOVIE_',
        title: '_DUMMY MOVIE_',
        director: '_DUMMY MOVIE_',
        genre: '_DUMMY MOVIE_',
        actors: '_DUMMY MOVIE_',
      });

    const updatedMovie = await request(app)
      .put(`/movie/ERROR`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: '_DUMMY MOVIE_UPDATED_',
        director: '_DUMMY MOVIE_',
        genre: '_DUMMY MOVIE_',
        actors: '_DUMMY MOVIE_',
      });

    await request(app)
      .delete(`/movie/jest/${movie.body.infos.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(updatedMovie.body).toHaveProperty('error');
  });

  it('Should not be able update a movie if not admin', async () => {
    const movie = await request(app)
      .post('/movie')
      .set('Authorization', `Bearer ${token}`)
      .send({
        tt: '_DUMMY MOVIE_',
        title: '_DUMMY MOVIE_',
        director: '_DUMMY MOVIE_',
        genre: '_DUMMY MOVIE_',
        actors: '_DUMMY MOVIE_',
      });

    const updatedMovie = await request(app)
      .put(`/movie/${movie.body.infos.id}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        title: '_DUMMY MOVIE_UPDATED_',
        director: '_DUMMY MOVIE_',
        genre: '_DUMMY MOVIE_',
        actors: '_DUMMY MOVIE_',
      });

    await request(app)
      .delete(`/movie/jest/${movie.body.infos.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(updatedMovie.body).toHaveProperty('error');
  });

  it('Should be able list all movies', async () => {
    const movie = await request(app)
      .post('/movie')
      .set('Authorization', `Bearer ${token}`)
      .send({
        tt: '_DUMMY MOVIE_',
        title: '_DUMMY MOVIE_',
        director: '_DUMMY MOVIE_',
        genre: '_DUMMY MOVIE_',
        actors: '_DUMMY MOVIE_',
      });

    const listMovies = await request(app)
      .get(`/movie`)
      .set('Authorization', `Bearer ${userToken}`);

    await request(app)
      .delete(`/movie/jest/${movie.body.infos.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(listMovies.body[0]).toHaveProperty('id');
  });

  it('Should be able list detail from a movie', async () => {
    const movie = await request(app)
      .post('/movie')
      .set('Authorization', `Bearer ${token}`)
      .send({
        tt: '_DUMMY MOVIE_',
        title: '_DUMMY MOVIE_',
        director: '_DUMMY MOVIE_',
        genre: '_DUMMY MOVIE_',
        actors: '_DUMMY MOVIE_',
      });

    const movieDetail = await request(app)
      .get(`/movie`)
      .set('Authorization', `Bearer ${userToken}`);

    await request(app)
      .delete(`/movie/jest/${movie.body.infos.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(movieDetail.body[0]).toHaveProperty('id');
  });

  it('Should be able vote a movie', async () => {
    const movie = await request(app)
      .post('/movie')
      .set('Authorization', `Bearer ${token}`)
      .send({
        tt: '_DUMMY MOVIE_',
        title: '_DUMMY MOVIE_',
        director: '_DUMMY MOVIE_',
        genre: '_DUMMY MOVIE_',
        actors: '_DUMMY MOVIE_',
      });

    const vote = await request(app)
      .post(`/movie/${movie.body.infos.id}/vote`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ score: 4 });

    await request(app)
      .delete(`/movie/jest/${movie.body.infos.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(vote.body).toHaveProperty('success');
  });
});
