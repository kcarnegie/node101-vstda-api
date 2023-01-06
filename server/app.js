const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const todo = [
	{
		todoItemId: 0,
		name: 'an item',
		priority: 3,
		completed: false
	},
	{
		todoItemId: 1,
		name: 'another item',
		priority: 2,
		completed: false
	},
	{
		todoItemId: 2,
		name: 'a done item',
		priority: 1,
		completed: true
	}
];

app.set('json spaces', 2);
app.use(bodyParser.json());

  app.get('/', function (req, res) {
    res.status(200).json({status: 'ok'})
  }) 

  app.get('/api/TodoItems', function (req, res) {
    res.status(200).json(todo);   
  });

  app.get('/api/TodoItems/:number', function (req, res) {
    const searchTodo = todo.find(obj => obj.todoItemId == req.params.number)
    res.json(searchTodo); 
  });

  app.delete('/api/TodoItems/:number', function (req, res) {
    const deleteItem = todo.findIndex(obj => obj.todoItemId == req.params.number)
    const result = todo.splice(deleteItem, 1)
       res.json(result[0]).status(200); 
  });

  app.post('/api/TodoItems/', function (req, res) {
    console.log(req.body)
    const postTodo = todo.findIndex(obj => obj.todoItemId == req.body.todoItemId)
    postTodo == -1 ? todo.push(req.body) : todo.splice(postTodo, 1, req.body)
    res.status(201).json(req.body);
  });


module.exports = app;
