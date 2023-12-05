const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  imgUrl: {
    type: String,
    required: [true, 'Please enter the image URL'],
  },
  blogUrl: {
    type: String,
    required: [true, 'Please enter the blog URL'],
  },
  title: {
    type: String,
    required: [true, 'Please enter the news title'],
  },
});

const News = mongoose.model('News', newsSchema);

module.exports = News;