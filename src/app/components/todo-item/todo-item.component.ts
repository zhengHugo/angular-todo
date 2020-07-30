import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Todo } from '../../models/Todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
  }

  // set dynamic classes
  setClasses(): { todo: boolean, 'is-completed': boolean } {
    return {
      todo: true,
      'is-completed': this.todo.completed
    };

  }

  onToggle(todo: Todo): void {
    // toggle the ui
    todo.completed = !todo.completed;
    // toggle on server
    this.todoService.toggleCompleted(todo).subscribe(todoRes => console.log(todoRes));
  }

  onDelete(todo: Todo): void {
    this.deleteTodo.emit(todo);
  }
}
