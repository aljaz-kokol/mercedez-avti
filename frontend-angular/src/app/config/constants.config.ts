import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Constants {
  public readonly API_ENDPOINT = 'http://localhost:3000/api';
}
