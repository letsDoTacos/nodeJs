const express = require('express');
const app = express();

const logger = require('morgan');
const chalk = require('chalk');
const $fetch = require('node-fetch'); 
const { response } = require('express');

app.use(express.static('public'));
app.use(logger('dev'));
app.set('view engine', 'ejs');

const apiUrl = 'https://api.nasa.gov/planetary/apod?api_key=BRcPG9fyiahDxH2GYhDqYOQtvvJz6L2xCgXasfMo';

app.get('/', (req, res) => {
  res.render('index', {data: ''});
})

app.get('/getPic', (req, res)=> {
  $fetch(apiUrl)
    .then(response => {
      if(!response.ok) {
        throw Error(response.statusText);
      }

      return response.json();
    })
    .then(data => {
      let url = data.url;
      res.render('index', { data:data.url });
    });
    });


const port = process.env.PORT || 3000; 
app.listen(port, () => console.log(chalk.green(`App is running on : ${chalk.blue(port)}`)));