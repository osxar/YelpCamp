const express = require('express');
const router = express.Router({ mergeParams: true }); // by deault the :id params isn't passed, so you will have to merge all params
const Campground = require('../models/campground');  //redundant
const Review = require('../models/review');  //redundant
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const reviews = require('../controllers/reviews');


router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports =router;