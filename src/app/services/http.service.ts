import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  user = "";

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.user.subscribe((ur) => {
      this.user = ur;
    });
  }

  fetchData(type: string) {
    return this.http
      .get<any>(`https://jsonplaceholder.typicode.com/${type}`)
      .pipe(
        map((res) => res.filter((re) => re["userId"] == this.user)),
        catchError((errorRes) => {
          return throwError(errorRes);
        })
      );
  }

  getLargestArr(arr: string[]): string {
    return arr.reduce((a, b) => {
      return a.length > b.length ? a : b;
    });
  }

  getSmallestArr(arr: string[]): string {
    return arr.reduce((a, b) => {
      return a.length < b.length ? a : b;
    });
  }
}
