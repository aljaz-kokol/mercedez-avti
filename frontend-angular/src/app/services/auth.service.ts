import {Injectable} from '@angular/core';
import {ApiHttpService} from '../core/services/api-http.service';
import {ApiEndpointService} from '../core/services/api-endpoint.service';
import {UserApi} from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private apiHttp: ApiHttpService,
              private apiEndpoint: ApiEndpointService) {}

  public async signUp(email: string, username: string, password: string, rePassword: string): Promise<{ result: boolean; message: string }> {
    const authResult = {
      result: true,
      message: '',
    };
    try {
      const httpResult = await this.apiHttp.post<{ message: string; user: UserApi }>(this.apiEndpoint.signupEndPont, {
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
}
