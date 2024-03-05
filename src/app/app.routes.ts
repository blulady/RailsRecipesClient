import { Routes } from '@angular/router';
import { noAuthGuard } from './core/guards/no-auth.guard';

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    loadComponent: () => import("./features/timeline/timeline.component").then((c) => c.TimelineComponent)
  },
  {
    path: "login",
    loadComponent: () => import("./features/auth/login/login.component").then((c) => c.LoginComponent),
    canActivate: [noAuthGuard]
  },

  {
    path: "signup",
    loadComponent: () => import("./features/auth/signup/signup.component").then((c) => c.SignupComponent),
    canActivate: [noAuthGuard]
  }

];
