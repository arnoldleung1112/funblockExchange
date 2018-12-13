//express setup
const express = require('express');
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//routes
const users = require('./routes/api/users')
const transactions = require('./routes/api/transactions')
const utils = require('./routes/api/utils')
const profiles = require('./routes/api/profiles')
//passport setup
const passport = require('passport');
app.use(passport.initialize());
require('./configs/passport')(passport);

//cors
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

//mongoDB setup
const mongoose = require('mongoose')
const db = require('./configs/keys').mongoURI;

//full stack heroku deployment setting
const path = require('path');

mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));



app.get('/api/',(req,res)=>{
    res.status(200).json({success: true});
});

// routing
app.use('/api/users', users);
app.use('/api/transactions', transactions);
app.use('/api/utils', utils);
app.use('/api/profiles', profiles);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));

  app.get('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log('server started ,listening at 3000');
})