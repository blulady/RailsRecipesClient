import { HttpInterceptorFn } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthenticationService)

  if(authService.isLoggedIn()) {
    const authToken = authService.getToken();
    const authReq = req.clone({
      headers: req.headers.set(`Authorization`, `Bearer ${authToken}`)
      // TADA add verication to make sure the token belongs to the user & isn't expired
    })

    return next(authReq)
  }
  return next(req);
};
