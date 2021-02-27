<<<<<<< HEAD
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

//query middleware
// It's a mongoose post middleware that collects the delete campground and delete all the reviews

=======
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

//query middleware
// It's a mongoose post middleware that collects the delete campground and delete all the reviews

>>>>>>> 84fa9e7913cdf20a73fd1a347d350cae17c3bdd2
module.exports = mongoose.model('Campground', CampgroundSchema);