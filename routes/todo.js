const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ToDo = mongoose.model("ToDo");
const User = mongoose.model("User");
const authLogin = require('../middleware/authlogin');


router.post('/createtodo' ,  authLogin , (req,res)=>{
	const {todo} = req.body;
	if(!todo){
		return res.status(422).json({error : "Plz add Todo"});
	}
	req.user.password = undefined;
	const todos = new ToDo({
		todo,
		postedBy : req.user
	})
	todos.save().then((result)=>{
		res.json({todos:result})
	}).catch((err)=>{
		console.log(err);
	})
});



router.get('/mytodo' ,  (req,res)=>{
	ToDo.find().then((mytodo)=>{
		res.json({mytodo})
	}).catch((err)=>{
		console.log(err);
	});
});
router.get('/mytodo/:todoid' , authLogin , (req,res)=>{
	User.findOne({_id:req.params.id}).select("-password").then(user=>{
		ToDo.find({postedBy:req.params.id}).populate("postedBy" , "_id name")
		.exec((err,todos)=>{
			if(err){
				return res.status(422).json({error:err})
			}
			res.json({user,todos})
		})
	}).catch(err=>{
		return res.status(404).json({error:"User not found"})
	})
});


router.delete('/deletetodo/:todoId' , (req,res)=>{
	ToDo.findOne({_id : req.params.todoId})
	.exec((err,todo)=>{
		if(err || !todo){
			return res.status(422).json({error : err})
		}
		else{
			todo.remove().then(result=>{
				res.json(result)
			}).catch(err=>{
				console.log(err);
			})
		}
	})
})

module.exports = router;