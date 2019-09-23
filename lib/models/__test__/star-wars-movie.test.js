const StarWarsMovie = require('../star-wars-movies');

describe('Star Wars Movie Model', () => {

  it('valid model all properties', () => {
    const data = {
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

    const starWarsMovie = new StarWarsMovie(data);
    const errors = starWarsMovie.validateSync();
    expect(errors).toBeUndefined();
    
    const json = starWarsMovie.toJSON();

    expect(json).toEqual({
      ...data,
      _id: expect.any(Object),
    });
  });

  it('validates required properties', () => {
    const data = {};
    const starWarsMovie = new StarWarsMovie(data);
    const { errors } = starWarsMovie.validateSync();
    expect(errors.title.kind).toBe('required');
    expect(errors.yearOfRelease.kind).toBe('required');
    expect(errors['productionTeam.eD'].kind).toBe('required');
    expect(errors['productionTeam.eP'].kind).toBe('required');
    expect(errors['productionTeam.writer'].kind).toBe('required');
  });

  it('populates default property', () => {
    const data = {
      title: 'A New Hope',
      episodeNumber: 4,
      yearOfRelease: 1971,
      availableToWatch: ['vhs', 'dvd', 'blueray', 'buy online'],
      productionTeam: {
        eD: 'George Lucas',
        eP: 'Rick McCallum',
        writer: 'George Lucas',
      }
    };

    const starWarsMovie = new StarWarsMovie(data);
    const error = starWarsMovie.validateSync();
    expect(error).toBeUndefined();
    expect(starWarsMovie.sucked).toBe(false);
  });

  it('enforces max of 9 episode number', () => {
    const data = {
      episodeNumber: 10
    };
    const starWarsMovie = new StarWarsMovie(data);
    const { errors } = starWarsMovie.validateSync();
    expect(errors.episodeNumber.kind).toBe('max');
  });

  it('enforces min of 0 episode number', () => {
    const data = {
      episodeNumber: -10
    };
    const starWarsMovie = new StarWarsMovie(data);
    const { errors } = starWarsMovie.validateSync();
    expect(errors.episodeNumber.kind).toBe('min');
  });
});