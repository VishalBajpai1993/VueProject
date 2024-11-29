<template>
  <div>
    <h1>To-Do List</h1>
    <form @submit.prevent="addTodo">
      <input v-model="newTodo" placeholder="Enter a new task" />
      <button>Add</button>
    </form>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <input type="checkbox" v-model="todo.completed" @change="updateTodo(todo)" />
        <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
        <button @click="deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      todos: [],
      newTodo: '',
    };
  },
  methods: {
    async fetchTodos() {
      const response = await axios.get('http://localhost:5000/api/todos');
      this.todos = response.data;
    },
    async addTodo() {
      const response = await axios.post('http://localhost:5000/api/todos', { text: this.newTodo });
      this.todos.push(response.data);
      this.newTodo = '';
    },
    async updateTodo(todo) {
      await axios.put(`http://localhost:5000/api/todos/${todo.id}`, todo);
    },
    async deleteTodo(id) {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      this.todos = this.todos.filter(todo => todo.id !== id);
    },
  },
  mounted() {
    this.fetchTodos();
  },
};
</script>

<style>
.completed {
  text-decoration: line-through;
}
</style>

