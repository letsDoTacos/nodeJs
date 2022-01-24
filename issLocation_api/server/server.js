// NASA ISS Location backend api

//=========>
//Foundation 
//=========>

const express = require('express');
const app = express();

const $fetch = require('node-fetch');
const logger = require('morgan');
const chalk = require('chalk');
const { response } = require('express');

app.use(logger('dev')); 
app.use(express.static('public'));
app.set('view engine', 'ejs');

const url = 'http://api.open-notify.org/iss-now.json';

//=========>
//Routes 
//=========>

app.get('/', (req, res)=> {
  res.render('index', {latitude:'', longitude:''})
});

app.get('/location', (req, res)=> {
  $fetch(url)
    .then(response => {
      if(!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      let latitude = data.iss_position.latitude;
      let longitude = data.iss_position.longitude;
      res.render('index', {latitude, longitude});
    })
    .catch(error => {
      console.log('Error from the nertwork', error);
      res.render('index', 
      {location: 'Oh dear. Something seems to have gown wrong. Please try agian later.'
    });
    })
});


//=========>
//Listner 
//=========>

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(chalk.green(`The server is listening on port: ${chalk.blue(port)}`)));