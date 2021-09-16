import {Injectable} from '@angular/core';
import {ApiHttpService} from '../core/api-http.service';
import {ApiEndpointService} from '../core/api-endpoint.service';
import {UserApi} from '../models/user.model';
import {Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';

interface LoginResponse {
  message: string;
  token: string;
  status: boolean; // true = admin, false = not admin
  expiresIn: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuth = false;
  private isAdmin = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();

  constructor(private apiHttp: ApiHttpService,
              private apiEndpoint: ApiEndpointService,
              private router: Router) {}

  public getIsAuth(): boolean {
    return this.isAuth;
  }

  public getIsAdmin(): boolean {
    return this.isAdmin;
  }

  public getToken(): string {
    return this.token;
  }

  public getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }

  public async signUp(email: string, username: string, password: string, rePassword: string): Promise<{ result: boolean; message: string }> {
    const authResult = {result: true, message: '',};
    try {
      const httpResult = await this.apiHttp.post<{ message: string; user: UserApi }>(this.apiEndpoint.signupEndpoint, {
        email: email,
        username: username,
        password: password,
        passwordConfirmation: rePassword
      }).toPromise();
      authResult.message = httpResult.message;
    } catch (err) {
      authResult.result = false;
      if (err.data) {
        authResult.message = err.data[0].message;
      } else {
        authResult.message = err.message;
      }
    }
    return authResult;
  }

  public async login(username: string, password: string): Promise<void> {
    try {
      const httpResult = await this.apiHttp.post<LoginResponse>(this.apiEndpoint.loginEndpoint, {
        username: username,
        password: password
      }).toPromise();
      this.token = httpResult.token;
      this.setAuthTimer(httpResult.expiresIn);
      this.isAuth = true;
      this.isAdmin = await this.getUserStatus();
      this.authStatusListener.next(true);
      AuthService.saveAuthData(this.token, AuthService.getExpirationDate(httpResult.expiresIn));
      // Get users status (isAdmin)
      await this.router.navigate(['/']);
    } catch (err) {
      console.log('There was an error logging in');
      console.log(err);
    }
  }

  public async getUserStatus(): Promise<boolean> {
    if (this.isAuth) {
      const result = await this.apiHttp.get<{ userStatus: boolean }>(this.apiEndpoint.userStatusEndpoint).toPromise();
      return result.userStatus;
    }
    return false;
  }

  // Auto authenticate a user
  public async autoAuthUser(): Promise<void> {
    const authInformation = AuthService.authData;
    if (!authInformation) {
      return;
    }
    if (AuthService.validExpirationDated(authInformation.expirationDate)) {
      this.token = authInformation.token;
      this.isAuth = true;
      this.isAdmin = await this.getUserStatus();
      this.authStatusListener.next(true);
      this.setAuthTimer(AuthService.getExpirationInMilliseconds(authInformation.expirationDate) / 1000);
    }
  }

  public async logout() {
    this.token = null;
    this.isAuth = false;
    this.isAdmin = false;
    this.authStatusListener.next(false);
    await this.router.navigate(['/']);
    clearTimeout(this.tokenTimer);
    AuthService.clearAuthData();
  }

  private static saveAuthData(token: string, expirationDate: Date): void {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private static clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  // Given the JWT token expiration date it returns a Date object of it
  private static getExpirationDate(expiresInSeconds: number): Date {
    const now = new Date();
    return new Date(now.getTime() + (expiresInSeconds * 1000));
  }

  // Returns the authentication data stored in local storage
  private static get authData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate)
    }
  }

  // Checks if the expiration date is still valid (is in the future)
  private static validExpirationDated(expirationDate: Date) {
    const now = new Date();
    return expirationDate > now;
  }

  // Given the expiration date it returns the difference between it and the current date in milliseconds
  private static getExpirationInMilliseconds(expirationDate: Date): number {
    const now = new Date();
    return (expirationDate.getTime()- now.getTime());
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => this.logout(),duration * 1000)
  }
}
