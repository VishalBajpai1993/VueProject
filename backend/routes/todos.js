const express = require('express');
const router = express.Router();
const fs = require('fs');

const DATA_FILE = './data.json';

// Get all todos
router.get('/', (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    res.json(data.todos);
});

// Add a new todo
router.post('/', (req, res) => {
    const { text } = req.body;
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    const newTodo = { id: Date.now(), text, completed: false };
    data.todos.push(newTodo);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.status(201).json(newTodo);
});

// Update a todo
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { text, completed } = req.body;
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    const todo = data.todos.find(todo => todo.id == id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    if (text) todo.text = text;
    if (completed !== undefined) todo.completed = completed;
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json(todo);
});

// Delete a todo
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    data.todos = data.todos.filter(todo => todo.id != id);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.status(204).end();
});

module.exports = router;