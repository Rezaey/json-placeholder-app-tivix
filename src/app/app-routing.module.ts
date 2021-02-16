import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { MainComponent } from "./main/main.component";
import { PostsComponent } from "./main/posts/posts.component";
import { TodosComponent } from "./main/todos/todos.component";
import { AuthGuard } from "./services/auth.guard";

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "main", component: MainComponent, canActivate: [AuthGuard] },
  { path: "posts", component: PostsComponent, canActivate: [AuthGuard] },
  { path: "todos", component: TodosComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
