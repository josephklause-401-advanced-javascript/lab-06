const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  episodeNumber: {
    type: Number,
    required: false,
    min: 1,
    max: 9
  },
  yearOfRelease: {
    type: Number,
    required: true
  },
  availableToWatch: [{
    type: String,
    enum: ['vhs', 'dvd', 'blueray', 'rent online', 'buy online'],
  }],
  sucked: {
    type: Boolean,
    required: true,
    default: false
  },
  productionTeam: {
    eD: {
      type: String,
      required: true
    },
    eP: {
      type: String,
      required: true
    },
    writer: {
      type: String,
      required: true
    }
  }
});

module.exports = mongoose.model('Star-Wars-Movie', schema);