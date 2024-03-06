import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../../shared/models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  firstName: string = "";
  lastName: string = "";

  currentUserBehaviorSubject = new BehaviorSubject<User | null>(null)
  constructor(private http:HttpClient) {}

  setCurrentUser(user: User | null) {
    this.currentUserBehaviorSubject.next(user);
  }

  getBootstrapData() {
    return this.http.get(`${environment.apiUrl}/web/bootstrap`).pipe(
      tap((res:any)=>{
        this.setCurrentUser(res.current_user)
        console.log(res);
        this.firstName = res.current_user.first_name;
        this.lastName = res.current_user.first_name;
        console.log(this.firstName, this.lastName)
      })
    )
  }
}
