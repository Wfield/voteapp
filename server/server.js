import express from 'express'
import React from 'react'
import history from 'connect-history-api-fallback'
import path from 'path'
import ejs from 'ejs'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import user from './routes/user'
import vote from './routes/vote'

const PORT= process.env.PORT|| 9000
const dbURL =process.env.PROD_MONGODB|| 'mongodb://localhost:27017/voteapp'

const app= express()
app.use(express.static(path.join(__dirname, '../src')))
app.set('views', path.join(__dirname, '../src'))
app.set('view engine', 'html')
app.engine('html', ejs.renderFile)

app.use(history({
	rewrites:[
		{from: /^\/vote\/.*$/, to: function(context){
			return context.parsedUrl.pathname;
		}},
		{from: /^\/user\/.*$/, to: function(context){
			return context.parsedUrl.path;
		}},
		{from: /\/.*/, to: '/'}
	]
}))

app.get('/', function(req, res, next){
	res.render('index');
	//next();
})

mongoose.connect(dbURL)
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