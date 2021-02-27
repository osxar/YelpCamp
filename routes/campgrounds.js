const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { campgroundSchema } = require('../schemas.js');
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');

const validateCampground = (req, res, next) => {  // it's a middleware to validate the post request of campground
    const {error}=campgroundSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }else{
        next();
    }
}


router.get('/', catchAsync(async (req,res)=>{
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
    }));


router.get('/new', async (req,res)=>{ 
    res.render('campgrounds/new');
    })

router.post('/', validateCampground, catchAsync(async (req, res) =>{
    //if(!req.body.Campground) throw new ExpressError('Invalid Campground data', 400)
    //console.log(req.body.campground)
    const campground = new Campground(req.body.campground);
    await campground.save();
    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`/campgrounds/${campground._id}`)
}))
// check error ha
router.get('/:id', catchAsync(async (req,res)=>{
    const campground = await Campground.findById(req.params.id).populate('reviews');
    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', {campground});
    }));

router.get('/:id/edit', catchAsync(async (req,res)=>{
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', {campground});
    }));


router.put('/:id', validateCampground, catchAsync(async (req,res)=>{
    const {id} = req.params;
    // console.log(req.body)
    // console.log(req.body.campground)
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground}); // based on campground[title], we get an object (hence we spred it into a new object) in in req.body, with the relant key value pairs 
    res.redirect(`/campgrounds/${campground._id}`);
    }));

router.delete('/:id', catchAsync(async (req,res)=>{
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
    }));

module.exports = router;