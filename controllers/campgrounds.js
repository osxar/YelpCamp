const Campground = require('../models/campground');


module.exports.index = async (req,res)=>{
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
    }

module.exports.createCampground = async (req, res) =>{
    //if(!req.body.Campground) throw new ExpressError('Invalid Campground data', 400)
    //console.log(req.body.campground)
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new');
}

module.exports.showCampground = async (req,res)=>{
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', {campground});
    }

module.exports.renderEditForm  = async (req,res)=>{
        const { id } = req.params;
        const campground = await Campground.findById(id)
        if (!campground) {
            req.flash('error', 'Cannot find that campground!');
            return res.redirect('/campgrounds');
        }
        res.render('campgrounds/edit', { campground });
        }

module.exports.updateCampground = async (req,res)=>{
            const {id} = req.params;
            const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground}); // based on campground[title], we get an object (hence we spred it into a new object) in in req.body, with the relant key value pairs 
            req.flash('success', 'Successfully updated campground!');
            res.redirect(`/campgrounds/${campground._id}`);
            }

module.exports.deleteCampground = async (req,res)=>{
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground')
    res.redirect('/campgrounds');
    }