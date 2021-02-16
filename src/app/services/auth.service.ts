import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthService {
  user = new BehaviorSubject<string>(null);

  constructor(private router: Router) {}

  login(userId: string) {
    this.user.next(userId);
    this.router.navigate(["/posts"]);
  }

  logout() {
    this.user.next(null);
    this.router.navigate(["/login"]);
  }
}
