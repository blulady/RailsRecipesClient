import { Routes } from '@angular/router';
import { noAuthGuard } from './core/guards/no-auth.guard';
import { authGuard } from './core/guards/auth.guard';

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

  // {
  //   path: "recipes",
  //   loadComponent: () => import("./shared/components/recipes/recipe/recipe.component").then((c) => c.RecipeComponent),
  //   canActivate: [authGuard]
  // },

  {
    path: "create-recipe",
    loadComponent: () => import("./features/create-recipe/create-recipe.component").then((c) => c.CreateRecipeComponent),
    canActivate: [authGuard]
  },

  {
    path: "signup",
    loadComponent: () => import("./features/auth/signup/signup.component").then((c) => c.SignupComponent),
    canActivate: [noAuthGuard]
  },
  {
    path: ":id",
    loadComponent: () => import("./features/recipe-details/recipe-details.component").then((c) => c.RecipeDetailsComponent),
    canActivate: [authGuard]
  }

];
