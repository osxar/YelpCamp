<<<<<<< HEAD
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    body: String,
    rating: Number
});

=======
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    body: String,
    rating: Number
});

>>>>>>> 84fa9e7913cdf20a73fd1a347d350cae17c3bdd2
module.exports = mongoose.model('Review', reviewSchema);