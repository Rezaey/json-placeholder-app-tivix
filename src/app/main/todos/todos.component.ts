import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { HttpService } from "src/app/services/http.service";

export interface Todo {
  userId: string;
  title: string;
  completed: boolean;
}

@Component({
  selector: "app-todos",
  templateUrl: "./todos.component.html",
  styleUrls: ["./todos.component.scss"],
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  _todos: Todo[] = [];
  user = "";

  selected = "All todos";
  selections = ["All todos", "Smallest todo by title", "Longest todo by title"];

  constructor(
    private authService: AuthService,
    private HttpService: HttpService
  ) {
    this.authService.user.subscribe((ur) => {
      this.user = ur;
    });
  }

  ngOnInit() {
    this.HttpService.fetchData("todos").subscribe((todos) => {
      this.todos = todos;
      this._todos = [...this.todos];
    });
  }

  onAddTodos(todos: NgForm) {
    this._todos.push({
      title: todos.value.title,
      completed: todos.value.completed,
      userId: this.user,
    });
    todos.reset();
    this.setSelecetion(this.selected);
  }

  setSelecetion(selection: string) {
    this.selected = selection;
    this.todos = [...this._todos];
    switch (selection) {
      case this.selections[0]:
        this.todos = [...this._todos];
        break;
      case this.selections[1]:
        const smallestTitle = this.HttpService.getSmallestArr(
          this.todos.map((post) => post.title)
        );
        this.todos = this.todos.filter((todo) => todo.title === smallestTitle);
        break;
      case this.selections[2]:
        const longestTitle = this.HttpService.getLargestArr(
          this.todos.map((todo) => todo.title)
        );
        this.todos = this.todos.filter((todo) => todo.title === longestTitle);
        break;
      default:
        break;
    }
  }
}
