const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
dotenv.config();
const passport = require('passport');
const { loginCheck } = require('./auth/passport');
loginCheck(passport);

//MongoDB Connection
const database = process.env.MONGOLAB_URI;
mongoose.connect(database, 
    {useUnifiedTopology: true,
     useNewUrlParser: true})
    .then(() => console.log('Connected to MongoDB Database !'))
    .catch(err => console.log(err,'Not Connected !'));


app.set('view engine', 'ejs');

//bodyParsing
app.use(express.urlencoded({extended : false}));

app.use(session({
    secret:'oneboy',
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/', require('./routes/login'));

const PORT = process.env.PORT || 4111;

app.listen(PORT, console.log(`Server start on port ${PORT}`));