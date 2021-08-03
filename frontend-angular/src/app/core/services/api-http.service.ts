import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiHttpService {

  constructor(private http: HttpClient) {}

  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  public post<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(url, data);
  }

  public put<T>(url: string, data: any): Observable<T> {
    return this.http.put<T>(url, data);
  }

  public delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
}
