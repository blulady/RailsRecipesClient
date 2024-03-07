import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  isError: boolean = false

  constructor(private authService: AuthenticationService, private router:Router){}

  login(){
    if(this.loginForm.valid){
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.authService.login(email, password).subscribe({
        next: (res:any) =>{
          console.log(res),

          // this.authService.setToken(res.token)
          // TADA will want this to route to favorites
          this.router.navigate(['/'])
        },
        error: (error:any) => {
          console.log("Things went wrong loggin ", error)
          this.isError = true
        }
      })
    }
  }

}
