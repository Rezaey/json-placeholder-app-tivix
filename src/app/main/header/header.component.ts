import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  user = "";

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.user.subscribe((ur) => {
      this.user = ur;
    });
  }

  logout() {
    this.authService.logout();
  }
}
