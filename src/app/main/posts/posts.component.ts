import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { HttpService } from "src/app/services/http.service";

export interface Post {
  title: string;
  body: string;
  userId: string;
}

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss"],
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  _posts: Post[] = [];
  user = "";

  selected = "All posts";
  selections = [
    "All posts",
    "Longest post by body",
    "Smallest post by body",
    "Smallest post by title",
    "Longest post by title",
  ];

  constructor(
    private authService: AuthService,
    private HttpService: HttpService
  ) {
    this.authService.user.subscribe((ur) => {
      this.user = ur;
    });
  }

  ngOnInit() {
    this.HttpService.fetchData("posts").subscribe((pos) => {
      this.posts = pos;
      this._posts = [...this.posts];
    });
  }

  onAddPost(post: NgForm) {
    this._posts.push({
      title: post.value.title,
      body: post.value.description,
      userId: this.user,
    });
    post.reset();
    this.setSelecetion(this.selected);
  }

  setSelecetion(selection: string) {
    this.selected = selection;
    this.posts = [...this._posts];
    switch (selection) {
      case this.selections[0]:
        this.posts = [...this._posts];
        break;
      case this.selections[1]:
        const biggestBody = this.HttpService.getLargestArr(
          this.posts.map((post) => post.body)
        );
        this.posts = this.posts.filter((post) => post.body === biggestBody);
        break;
      case this.selections[2]:
        const smallestBody = this.HttpService.getSmallestArr(
          this.posts.map((post) => post.body)
        );
        this.posts = this.posts.filter((post) => post.body === smallestBody);
        break;
      case this.selections[3]:
        const smallestTitle = this.HttpService.getSmallestArr(
          this.posts.map((post) => post.title)
        );
        this.posts = this.posts.filter((post) => post.title === smallestTitle);
        break;
      case this.selections[4]:
        const longestTitle = this.HttpService.getLargestArr(
          this.posts.map((post) => post.title)
        );
        this.posts = this.posts.filter((post) => post.title === longestTitle);
        break;
      default:
        break;
    }
  }
}
