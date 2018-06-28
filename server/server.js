import express from 'express'
import React from 'react'
import path from 'path'
import ejs from 'ejs'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import user from './routes/user'
import vote from './routes/vote'

const PORT= process.env.PORT|| 9000

const app= express()
app.use(express.static(path.join(__dirname, '../src')))
app.set('views', path.join(__dirname, '../src'))
app.set('view engine', 'html')
app.engine('html', ejs.renderFile)

app.get('/', function(req, res, next){
	res.render('index');
	//next();
})

mongoose.connect("mongodb://localhost:27017/voteapp")
const db= mongoose.connection
db.on('error', (err) => console.error("mongodb connect faild!"+ err))
db.on('open', () => console.log('mongodb connect success!'))

app.use(bodyParser.json());
app.use('*', (req, res, next) => {
	next();
})

app.use('/user', user);
app.use('/vote', vote);
app.use((err, req, res, next)=>{
	console.error(err.stack);
	res.status(500).send('something broke!');
})

app.listen(PORT, ()=> console.log('server started'))