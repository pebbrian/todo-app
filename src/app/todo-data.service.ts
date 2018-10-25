import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
// Should communicate with a distant REST API later
export class TodoDataService {

  lastId: number = 0; // incremented id
  todos: Todo[] = [] // list of todos

  constructor() {}

  // Create some example Todos
  createMockup() {
    this.addTodo(new Todo({'title': 'Finish this app before tomorrow'}));
    this.addTodo(new Todo({'title': 'Take some rest'}));
    this.addTodo(new Todo({'title': 'Make coffee', 'complete': true}));
  }

  // Simulate POST /todos
  addTodo(todo: Todo): TodoDataService {
    if (!todo.id) {
      todo.id = ++this.lastId;
    }
    this.todos.push(todo);
    return this;
  }

  // Simulate DELETE /todos/:id
  deleteTodoById(id: number): TodoDataService {
    this.todos = this.todos
      .filter(todo => todo.id !== id);
    return this;
  }

  // Simulate PUT /todos/:id
  updateTodoById(id: number, values: Object = {}): Todo {
    let todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }

  // Simulate GET /todos
  getAllTodos(): Todo[] {
    return this.todos;
  }

  // Simulate GET /todos/:id
  getTodoById(id: number): Todo {
    return this.todos
      .filter(todo => todo.id === id)
      .pop();
  }

  // Toggle todo complete
  toggleTodoComplete(todo: Todo){
    let updatedTodo = this.updateTodoById(todo.id, {
      complete: !todo.complete
    });
    // Place a todo at the end of the list if completed
    if( todo.complete ) {
      for( var k = 0; k < this.todos.length; k++ ) {
        if( todo.id == this.todos[k].id ) {
          this.todos.splice(k, 1);
          this.todos.push(todo);
        }
      }
    }
    return updatedTodo;
  }
}