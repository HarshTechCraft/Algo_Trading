const config = require('./configs/keys');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const User = require('../server/models/users');
const signup=require('./routes/signup');
const signin=require('./routes/signin');
const addbroker=require('./routes/addbroker')
require('./models/users');
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(`${config.MongoUrl}`)
    .then(() => {
        console.log('Mongoose Connected');
    })
    .catch((e) => {
        console.log('Error is ' + e)
    });



const port = process.env.port || 5000;

app.post('/signup',signup);
app.post('/signin',signin);
app.post('/addbroker',addbroker);

app.listen(port, () => {
    console.log('http://localhost:5000');
})