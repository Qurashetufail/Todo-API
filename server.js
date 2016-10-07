var express= require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

//body parser
app.use(bodyParser.json());

app.get('/',function (req,res){
	res.send('Todo API Root');
});

//get /todos?queryParams=?
app.get('/todos',function (req,res){
	var queryParams=req.query;
	var filteredTodos=todos;

	if(queryParams.hasOwnProperty('completed') && queryParams.completed === 'true'){
		filteredTodos=_.where(filteredTodos, {completed:true});
	} else if(queryParams.hasOwnProperty('completed') && queryParams.completed === 'false'){
		filteredTodos=_.where(filteredTodos, {completed:false});
	}

	if(queryParams.hasOwnProperty('description') && queryParams.description.length > 0){
		filteredTodos=_.filter(filteredTodos,function (todo){
			return todo.description.indexOf(queryParams.description) > -1;

		});
	}

	res.json(filteredTodos); //converted into json from array
});

//get /todos/id
app.get('/todos/:id',function (req,res){
	//convert string to int
	var matchedTodo = _.findWhere(todos,{id: parseInt(req.params.id,10)});
	if(matchedTodo){
		res.json(matchedTodo);
	} else {
		res.status(404).send();
	}

	//res.send('Asking for todo with id: ' + req.params.id);
});

//POST Add
app.post('/todos',function (req,res){
	//picks only specified field
	var body = _.pick(req.body,'description','completed');

	if (!_.isBoolean(body.completed) || !_.isString(body.description) ||  body.description.trim().length === 0) {
		return res.status(400).send()
	}

	body.description=body.description.trim();

	body.id=todoNextId++;
	todos.push(body);
	res.json(body);
});

//DELETE /:id
app.delete('/todos/:id',function (req,res){
	var matchedTodo = _.findWhere(todos,{id: parseInt(req.params.id,10)});
	if(!matchedTodo){
		res.status(404).json("error:no to-do found with that id");
	}
	else{
		todos = _.without(todos,matchedTodo);
		res.json(matchedTodo);
	}
});

//PUT /:id
app.put('/todos/:id',function (req,res){
	var body = _.pick(req.body,'description','completed');
	var matchedTodo = _.findWhere(todos,{id: parseInt(req.params.id,10)});
	var validAttributes={};

	if(!matchedTodo){
		return res.status(404).send();
	}

	if(body.hasOwnProperty('completed') && _.isBoolean(body.completed)){
		validAttributes.completed = body.completed;
	} else if(body.hasOwnProperty('completed')) {
		return res.status(400).send();
	} 

	if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
		validAttributes.description = body.description;
	} else if (body.hasOwnProperty('description')) {
		return res.status(400).send();
	}

	//objects in js are passed by reference
	_.extend(matchedTodo,validAttributes);
	res.json(matchedTodo);
});

app.listen(PORT, function(){
	console.log('Express listening on port '+ PORT + '!');
});