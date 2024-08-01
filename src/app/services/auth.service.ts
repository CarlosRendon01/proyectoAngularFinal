import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from './login.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(private loginService: LoginService) {
    this.userSubject = new BehaviorSubject<User | null>(this.loginService.getLoggedInUser());
    this.user = this.userSubject.asObservable();
  }

  get userValue(): User | null {
    return this.userSubject.value;
  }

  login(email: string, password: string): Observable<User | null> {
    return this.loginService.login(email, password).pipe(
      map(user => {
        this.userSubject.next(user);
        return user;
      })
    );
  }

  logout() {
    this.loginService.logout();
    this.userSubject.next(null);
  }
}
