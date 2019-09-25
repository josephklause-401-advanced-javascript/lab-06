const request = require('../request');
const db = require('../db');

describe('star-wars-movies api', () => {

  beforeEach(() => {
    return db.dropCollection('star-wars-movies');
  });

  const aNewHope = {
    title: 'A New Hope',
    episodeNumber: 4,
    yearOfRelease: 1971,
    availableToWatch: ['vhs', 'dvd', 'blueray', 'buy online'],
    sucked: false,
    productionTeam: {
      eD: 'George Lucas',
      eP: 'Rick McCallum',
      writer: 'George Lucas',
    }
  };

  function postMovie(starWarsMovie) {
    return request
      .post('/api/star-wars-movies')
      .send(starWarsMovie)
      .expect(200)
      .then(({ body: movie }) => movie);
  }

  it('posts a star wars movie', () => {
    return postMovie(aNewHope)
      .then(movie => {
        expect(movie).toEqual({
          _id: expect.any(String),
          __v: 0,
          ...aNewHope
        });
      });
  });

  it('gets a star wars movie by id', () => {
    return postMovie(aNewHope)
      .then(movie => {
        return request.get(`/api/star-wars-movies/${movie._id}`)
          .expect(200)
          .then(({ body: returnedMovie }) => {
            expect(returnedMovie).toEqual(movie);
          });
      });
  });

  it('gets a list of cats', () => {
    return Promise.all([
      postMovie(aNewHope),
      postMovie(aNewHope),
      postMovie(aNewHope),
    ])
      .then(() => {
        return request
          .get('/api/star-wars-movies')
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(3);
      });
  });

  it('updates a movie', () => {
    return postMovie(aNewHope)
      .then(movie => {
        movie.title = 'Empire Strikes Back';
        return request
          .put(`/api/star-wars-movies/${movie._id}`)
          .send(movie)
          .expect(200);
      })
      .then(({ body: returnedMovie }) => {
        expect(returnedMovie.title).toBe('Empire Strikes Back');
      });
  });

  it('deletes a movie', () => {
    return postMovie(aNewHope)
      .then(movie => {
        return request
          .delete(`/api/star-wars-movies/${movie._id}`)
          .expect(200);
      });
  });
});