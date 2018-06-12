import React, { Component } from 'react';
import './App.css';

import InputBar from './InputBar';
import TodoItem from './TodoItem';

class App extends Component {
  constructor(props) {
    super(props);

    localStorage.clear();

    if (!localStorage.getItem('todos')) {
      const todos = [
        'Dab on them haters',
        'Think about what if haters Dab back?',
      ];
      
      localStorage.setItem('todos', JSON.stringify(todos));
    }

    this.state = {
      todos: JSON.parse(localStorage.getItem('todos')),
    };

    this.handleNewItem = this.handleNewItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handeleEditItem = this.handeleEditItem.bind(this);
  }

  getTodos() {
    return this.state.todos;
  }

  handleNewItem(newTodo) {
    const todos = this.getTodos();

    todos.push(newTodo);

    this.setState({ todos });
  }

  handleDeleteItem(newTodo) {
    const todos = this.getTodos();

    const filteredTodos = todos.filter(todo => {
      return todo !== newTodo;
    });

    this.setState({ todos: filteredTodos });
  }

  handeleEditItem(newTodo, originalTodo) {
    const todos = this.getTodos();

    const editedTodos = todos.map(todo => {
      if (todo === originalTodo) {
        todo = newTodo;
      }

      return todo;
    });

    this.setState({ todos: editedTodos });
  }

  componentDidUpdate() {
    console.log('Setting todo in local storage');
    localStorage.setItem('todos', JSON.stringify(this.state.todos));
  }

  render() {
    return (
      <div className="App">
        <h1>ToDo React</h1>
        <InputBar 
          onAdd={this.handleNewItem}
        />
        {
          this.state.todos.map((todo, index) => 
            (
              <TodoItem 
                key={`${todo}${index}`}
                todo={todo}
                onDelete={this.handleDeleteItem}
                onEdit={this.handeleEditItem}
              />
            )
          )
        }
      </div>
    );
  }
}

export default App;
