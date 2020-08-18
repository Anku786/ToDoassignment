const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} =mongoose.Schema.Types;

const todoSchema = new Schema({
	todo : {
		type : String,
		required : true
	},
	postedBy : {
		type : ObjectId,
		ref : "User"
	}
} , {timestamps:true});

mongoose.model("ToDo" , todoSchema);