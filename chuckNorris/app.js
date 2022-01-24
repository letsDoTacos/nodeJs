// Chuck Norris jokes fetch api

// Foundation 
const express = require('express');
const app = express();

const $fetch = require('node-fetch');
const logger = require('morgan');
const chalk = require('chalk');
const { response } = require('express');

app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.static('public'));

const endpoint = 'https://api.chucknorris.io/jokes/random';

// Routes
app.get('/', (req, res)=> {
  res.render('index', { data: '' });
});

app.get("/getJoke", (req, res)=> {
  $fetch(endpoint)
    .then(response => {
      if (!response.ok) {
        // TODO: toggle the bang to simulate a fetch error
        throw Error(response.statusText);
      }
    
      return response.json();
      
    })
      .then(data => {
      res.render("index", { data: data.value });
    })});

// Listner
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(chalk.blue(`App on port: ${chalk.green(port)}`)));
