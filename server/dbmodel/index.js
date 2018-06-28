import mongoose from 'mongoose'
var ObjectId= mongoose.Schema.Types.ObjectId

const userSche= new mongoose.Schema({
	username: { type: String, isRequired: true},
	password: { type: String, isRequired: true},
	email: { type: String, isRequired: true}
})

const voteSche= new mongoose.Schema({
	title: { type: String, isRequired: true},
	options: { type: Object, default: [] },
	discribe: { type:String, isRequired: true },
	user: { type: ObjectId, ref: 'User'},
	username: { type: String, isRequired: true }
})

const Models= {
	User: mongoose.model('User', userSche),
	Vote: mongoose.model('Vote', voteSche)
}

export default Models