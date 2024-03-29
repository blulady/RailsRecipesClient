import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthenticationService } from './core/services/authentication.service';
import { UserService } from './core/services/user.service';
import { of } from 'rxjs';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export function intializeUserData(userService:UserService, authService:AuthenticationService){
  console.log("It's Alive!")
  if(authService.isLoggedIn()){
    return () => userService.getBootstrapData().subscribe();
  }else{
    return () => of(null);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: intializeUserData,
      deps: [UserService, AuthenticationService],
      multi: true
    },
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
