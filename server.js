var express= require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
	id: 1,
	description: 'Meet mom for lunch',
	completed : false
}, {
	id: 2,
	description: 'Goto market',
	completed: false
},{
	id: 3,
	description: 'My first entry to postman',
	completed: true
}];

app.get('/',function (req,res){
	res.send('Todo API Root');
});

//get /todos
app.get('/todos',function (req,res){
	res.json(todos); //converted into json from array
});

//get /todos/id
app.get('/todos/:id',function (req,res){
	var todoId = parseInt(req.params.id,10);		//convert string to int
	var matchedTodo;
	
	todos.forEach(function(todo){
		if(todo.id === todoId){
			matchedTodo=todo;
		}
	})

	if(matchedTodo){
		res.json(matchedTodo);
	} else {
		res.status(404).send();
	}

	//res.send('Asking for todo with id: ' + req.params.id);
});

app.listen(PORT, function(){
	console.log('Express listening on port '+ PORT + '!');
});