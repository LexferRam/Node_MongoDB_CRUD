const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

//connection to database
mongoose.connect('mongodb://localhost/crud-mongo', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(db => console.log('DB connected'))
    .catch(err => console.log(err));

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

//settimgs
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//routes
app.use('/', require('./routes/index'));

//starting server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
});