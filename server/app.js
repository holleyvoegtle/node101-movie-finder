// import files
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const axios = require('axios');

const API = process.env.API_KEY
const url = 'http://www.omdbapi.com'  
const app = express();


// apply middleware:
app.use(morgan('dev'));

//declare empty object for cache
var movieCache = {}

app.get('/', (req, res) => {
    let reqURL = req.url;
    let siteURL = url + reqURL + '&apikey=' + API;
    if (movieCache[reqURL] == null) {
        axios.get(siteURL)
            .then((response) => {
                res.status(200);
                movieCache[reqURL] = response.data;
                res.send(response.data);
            })
        
        .catch(error => {
            console.log(error.message);
        
        });
        console.log(movieCache[reqURL])
    }
    else {
        res.send(movieCache[reqURL]);
        res.status(200);
    }
})



module.exports = app;


