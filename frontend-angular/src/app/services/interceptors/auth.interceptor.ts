import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from '../auth.service';

// Add JWT token to all outgoing requests
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();
    req = req.clone({
      headers: req.headers.set('Authorization', authToken) // set() --> adds a new header and its value. Does NOT modify values of any other headers
    }); // Copy and modify specific parts of the request
    return next.handle(req); // Take request and next it
  }
}
