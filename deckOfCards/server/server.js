// Foundation 
//===============================>
const express = require('express')
const app = express()
const needle = require('needle')
const chalk = require('chalk');

const logger = require('morgan')
app.use(logger('dev'))

app.set('view engine', 'ejs')

// Route handlers 
//===============================>

app.get('/', (req, res)=> {
  res.render('index', {cards: []})
})

let endpoint = 'https://deckofcardsapi.com/api/deck/new/draw/?count=5'
app.get('/deal', (req, res)=>{
  needle.get(endpoint, (error, data)=>{
    if(!error && data.statusCode == 200){
      res.render('index', {cards: data.body.cards})
    } else {
      res.render('error')
    }
  })
})

// Listner  
//===============================>
const port = process.env.PORT || 3000
app.listen(port, ()=> console.log(chalk.green(`Server is running on port ${chalk.blue(port)}`)))