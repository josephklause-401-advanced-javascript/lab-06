const express = require('express');
const app = express();

// middleware
const morgan = require('morgan');
const checkConnection = require('./middleware/check-connection');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));
app.use(checkConnection);

// test route
app.get('/hello', (req, res) => {
  res.send('hello express');
});
// API ROUTES
// const starWarsMovies = require('./routes/star-wars-movies');
// app.use('/api/star-wars-movies', starWarsMovies);

// NOT FOUND
const api404 = require('./middleware/api-404');
app.use('/api', api404);

// ERRORS
const errorHandler = require('./middleware/error-handler');
app.use(errorHandler);

module.exports = app;