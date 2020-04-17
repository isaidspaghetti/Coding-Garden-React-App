import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      message: "Hello Coding Garden!",
      newTodo: "",
      todos: [
        {
          title: "Learn React",
          done: false,
        },
        {
          title: "Learn JSX",
          done: false,
        },
      ],
    };
  }

  newTodoChanged(event) {
    console.log(event.target.value);
    this.setState({
      newTodo: event.target.value,
    });
  }
  formSubmitted(event) {
    event.preventDefault();
    console.log(this.state.newTodo);
    this.setState({
      //the spread operator '...' says: take the state.todos array, put it into this new "todos" array, then add a new item into that aray, which is the newTodo
      todos: [
        ...this.state.todos,
        {
          title: this.state.newTodo,
          done: false,
        },
      ],
    });
  }
  toggleTodoDone(event, index) {
    const todos = [...this.state.todos]; //shallow copy of the array
    todos[index] = { ...todos[index] }; //shallow copy of an item in the aray
    todos[index].done = event.target.checked; //update done property on copy of todo
    this.setState({
      todos,
    });
  }

  removeTodo(index) {
    const todos = [...this.state.todos]; //copy the array
    todos.splice(index, 1); //remove item
    this.setState({
      todos,
    });
  }

  allDone() {
    const todos = this.state.todos.map((todo) => {
      return {
        title: todo.title,
        done: true,
      };
    });
    this.setState({
      todos,
    });
  }

  render() {
    return (
      <div className="App">
        <h3> {this.state.message}</h3>
        <form onSubmit={this.formSubmitted.bind(this)}>
          <label htmlFor="newTodo">New Todo</label>
          <input
            onChange={(event) => this.newTodoChanged(event)}
            id="newTodo"
            name="newTodo"
          />
          <button type="submit">Add Todo</button>
        </form>
        <button onClick={() => this.allDone()}>All Done</button>
        <ul>
          {/* //take the array of objects and put them into an array of JSX */}
          {/* .map also can give you the index of the object. */}
          {this.state.todos.map((todo, index) => {
            return (
              <li key={todo.title}>
                <input
                  onChange={(event) => this.toggleTodoDone(event, index)}
                  type="checkbox"
                  checked={todo.done}
                />
                {/* change text class if done */}
                <span className={todo.done ? "done" : ""}>{todo.title}</span>
                <button onClick={() => this.removeTodo(index)}>Remove</button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
