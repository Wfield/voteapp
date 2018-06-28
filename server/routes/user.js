import express from 'express'
import Models from '../dbmodel/index'

const router= express.Router()

router.post('/register', function(req, res){
	let user= req.body;
	let info= {};
	Models.User.findOne({ username: user.username}, function(err, doc){
		if(err){
			res.send('register faild');
		}
		else if(doc){
			res.send({ id: 2, type: 2, content: 'user aready exist'});
		}
		else{
			Models.User.findOne({ email: user.email }, function(err, doc){
				if(err){
					res.send('register faild');
				}
				else if(doc){
					info={
						userId: doc._id,
						username: doc.username,
						email: doc.email
					}
					res.send({ id: 1, type: 2, content: info});
				}
				else{
					Models.User.create(user, function(err, doc){
						if(err){
							res.send('register faild');
						} 
						else{
							res.send({ id: 1, type: 2, content: [doc._id]});
						}
					})
				}
			})
		}
	})
})

router.post('/login', function(req, res){
	let info= {};
	let user= req.body; //username  password
	//console.log(typeof req.body); //object
	Models.User.findOne(user, function(err, doc){
		if(err){
			res.send({ id: 0, type: 1, content: err });
		}
		else{
			if(doc){
				info={
					userId: doc._id,
					username: doc.username,
					email: doc.email
				}
				res.send({ id: 1, type: 2, content: info});
			}
			else{
				res.send({id: 0, type: 1, content: 'user does not exist'});
			}
		}
	})
})

export default router