const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate'); // EJS Layout  for boiler plate
const ExpressError = require('./utils/ExpressError');
const campgrounds = require('./routes/campgrounds');
const reviews = require('./routes/reviews');
const session = require('express-session');
const flash = require('connect-flash');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
    
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express()


app.engine('ejs',ejsMate); 
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); //setting middleware for passing the body of a post request
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public'))); //serving static assets from the public folder (i.e custom js and css)

// create a configuarion object for the session
const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,  // doesn't allow cookies to be access trough client side script
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

// use tthe session as a middleware
app.use(session(sessionConfig));
app.use(flash());

// define a middleware that contain flash messages, and pass it through ever request 
app.use((req, res, next) => {
    res.locals.success = req.flash('success'); // save the success (key value pair) in a local memory of success 
    res.locals.error = req.flash('error');
    next();
})

// use routes as middleware
app.use('/campgrounds', campgrounds)
app.use('/campgrounds/:id/reviews', reviews)


app.get('/', (req,res)=>{
res.render('home')
})

// display 404
app.all('*', (req,res,next) => { // based on the order, this will only run if nothing else was matched first
    next(new ExpressError('Page Not Found', 404))
})

// custom method middleware that handle error
app.use((err, req, res, next) => {
    const {statusCode=500, message='Something went wrong'} = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', {err});
})

app.listen(3000, () => {
    console.log("Serving on port 3000!")
 });