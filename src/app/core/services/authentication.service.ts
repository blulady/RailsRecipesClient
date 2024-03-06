import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient, private router:Router, private userService:UserService) { }

  login(email:string, password:string){
    return this.http.post<{token:string}>(`${environment.apiUrl}/login`,
    {email,
    password}).pipe(switchMap((res:any) =>{
      this.setToken(res.token);
      return  this.userService.getBootstrapData().pipe(
        tap((data:any) =>{
          const currentUser = data.current_user;
          this.userService.setCurrentUser(currentUser);
        })
      )
    }))
  }
  setToken(token:string){
    localStorage.setItem('token', token);
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn(){
    return !!this.getToken();
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }

  signup(data:any){
    return this.http.post(`${environment.apiUrl}/users`, data)
  }

}

