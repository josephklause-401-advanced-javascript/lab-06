require('dotenv').config();
require('./lib/connect')();
const express = require('express');
const app = express();
const StarWarsMovie = require('./lib/models/star-wars-movies');

app.use(express.json());

app.get('api/starWarsMovies', (req, res, next) => {
  StarWarsMovie.find()
    .then(starWarsMovie => {
      res.json(starWarsMovie);
    })
    .catch(next);
});

app.get('api/starWarsMovies/:id', (req, res, next) => {
  StarWarsMovie.findById(req.params.id)
    .then(starWarsMovie => {
      res.json(starWarsMovie);
    })
    .catch(next);
});

app.post('/api/starWarsMovies', (req, res, next) => {
  StarWarsMovie.create(req.body)
    .then(starWarsMovie => {
      res.json(starWarsMovie);
    })
    .catch(next);
});

app.put('api/starWarsMovies/:id', (req, res, next) => {
  StarWarsMovie.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
    .then(starWarsMovie => {
      res.json(starWarsMovie);
    })
    .catch(next);
});

app.delete('api/starWarsMovies/:id', (req, res, next) => {
  StarWarsMovie.findByIdAndRemove(req.params.id)
    .then(removed => {
      res.json(removed);
    })
    .catch(next);
});

app.listen(3000, () => console.log('server running on port 3000'));