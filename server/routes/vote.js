import express from 'express'
import Models from '../dbmodel/index'
const router= express.Router()

router.post('/publish', function(req, res){
	let info= req.body;
	if(info.voteId){
		console.log(info.voteId, info.options)
		Models.Vote.update({_id: info.voteId}, {$set: {options: info.options}}, function(err, doc){
			if(err){
				res.send(err);
			}
			else{
				res.send({title: 1, content: 'update done'});
			}
		})
	}
	else{
		info.user= info.userId;
		delete info.userId;
		Models.User.findById(info.user, function(err, doc){ //update list field of User?
			if(err){
				res.send(err);
				return;
			}
			else{
				info.username= doc.username;
			}
			Models.Vote.create(info, function(err, doc){
				if(err){
					res.send(err);
				}
				else{
					if(doc){
						res.send({ title: 1, content: 'vote done'});
					}
				}
			})
		})
	}
})

router.get('/fetchList', function(req, res){
	let voteList= [];
	if(req.query.userId){
		Models.Vote.find({user: req.query.userId}, function(err, docs){
			if(err){
				console.log(err);
			}else if(docs){
				docs.forEach(function(item){
					voteList.push({
						id: item._id,
						title: item.title,
						option: item.options,
						describe: item.describe,
						user: {_id: item.user, username: item.username }
					})
				});
				res.send(voteList);			
			}
			else{
				console.log("user create vote list is empty");
			}
		})
	}
	else{
		Models.Vote.find().populate('user').exec(function(err, docs){
			docs.forEach(function(item){
				voteList.push({
					id: item._id,
					title: item.title,
					option: item.options,
					describe: item.describe,
					user: {_id: item.user._id, username: item.user.username }
				})
			});
			res.send(voteList);
		})
	}
})

export default router