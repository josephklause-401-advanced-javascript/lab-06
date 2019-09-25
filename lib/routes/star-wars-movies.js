/* eslint-disable new-cap */
const router = require('express').Router();
const StarWarsMovie = require('../models/star-wars-movies');

router
  .post('/', (req, res, next) => {
    StarWarsMovie.create(req.body)
      .then(movie => res.json(movie))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    StarWarsMovie.findById(req.params.id)
      .then(movie => res.json(movie))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    StarWarsMovie.find()
      .then(movie => res.json(movie))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    StarWarsMovie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .then(movie => res.json(movie))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    StarWarsMovie.findByIdAndRemove(req.params.id)
      .then(movie => res.json(movie))
      .catch(next);
  });

module.exports = router;