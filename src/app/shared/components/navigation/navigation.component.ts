import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { User } from '../../models/user';
import { UserService } from '../../../core/services/user.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {

  currentUser: User | null = null;
  firstName: string = '';
  lastName: string = '';

  constructor(private authService: AuthenticationService, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.currentUserBehaviorSubject.subscribe((user) =>
    {this.currentUser = user;})
    // this.getFirstName()
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout(){
    this.authService.logout();
    this.userService.setCurrentUser(null);
  }
}
