import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpEvent} from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiHttpService {

  constructor(private http: HttpClient) {}

  public get<T>(url: string, options?: any): Observable<HttpEvent<T>> {
    return this.http.get<T>(url, options);
  }

  public post<T>(url: string, data: any, options?: any): Observable<HttpEvent<T>> {
    return this.http.post<T>(url, data, options);
  }

  public put<T>(url: string, data: any, options?: any): Observable<HttpEvent<T>> {
    return this.http.put<T>(url, data, options);
  }

  public delete<T>(url: string, options?: any): Observable<HttpEvent<T>> {
    return this.http.delete<T>(url, options);
  }
}
