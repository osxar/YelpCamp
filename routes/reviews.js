<<<<<<< HEAD
const express = require('express');
const router = express.Router({ mergeParams: true }); // by deault the :id params isn't passed, so you will have to merge all params
const Campground = require('../models/campground');
const Review = require('../models/review');
const { reviewSchema } = require('../schemas.js');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

const validateReview = (req, res, next) => { 
    const {error} = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }else{
        next();
    }
}


router.post('/', validateReview, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Created new reviews!');
    res.redirect(`/campgrounds/${campground._id}`);
}));

router.delete('/:reviewId', catchAsync(async (req,res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Created delete campground');
    res.redirect(`/campgrounds/${id}`);
}));

=======
const express = require('express');
const router = express.Router({ mergeParams: true }); // by deault the :id params isn't passed, so you will have to merge all params
const Campground = require('../models/campground');
const Review = require('../models/review');
const { reviewSchema } = require('../schemas.js');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

const validateReview = (req, res, next) => { 
    const {error} = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }else{
        next();
    }
}


router.post('/', validateReview, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Created new reviews!');
    res.redirect(`/campgrounds/${campground._id}`);
}));

router.delete('/:reviewId', catchAsync(async (req,res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Created delete campground');
    res.redirect(`/campgrounds/${id}`);
}));

>>>>>>> 84fa9e7913cdf20a73fd1a347d350cae17c3bdd2
module.exports =router;