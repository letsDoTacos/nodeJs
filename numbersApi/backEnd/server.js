//===========>
// Foundation 
//===========>
const express = require('express');
const app = express();

// "$fetch" to note we are running on the backend
const $fetch = require('node-fetch'); 
const logger = require('morgan');
const chalk = require('chalk');
const { response } = require('express');

app.use(logger('dev'));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const url = 'http://numbersapi.com/random/trivia?json';

//===========>
// Routes 
//===========>
app.get('/', (req, res)=> {
  res.render('index', {trivia: ''})
});

app.get('/trivia', (req, res)=> {
  $fetch(url)
    .then(response => {
      if(!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      let trivia = data.text;
      res.render('index', {trivia});
    })
    .catch(error => {
      console.log("Error from the network:", error);
      res.render('index', {
        trivia: 'If you are reading this; an error has occured.'
      });
    })



});


//===========>
// Listner 
//===========>

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(chalk.green(`App is running on ${chalk.blue(port)}`)));

