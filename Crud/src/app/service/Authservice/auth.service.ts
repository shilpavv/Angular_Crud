
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  authenticateUser(email: string, password: string) {
    return this.http.get<any>(`Users`).pipe(
      map(users => {
        console.log("hi allllllllllllllll",users)
        return users.find((user: any) => {
          return user.email === email && user.password === password;
        });
      })
      );
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('loggedUser');
  }
}