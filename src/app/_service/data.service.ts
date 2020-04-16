
import { environment } from './../../environments/environment';


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { LoginResponse } from '../_models/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // API path
  basePath = environment.basePath;

  constructor(
    private router: Router,
    private http: HttpClient
    ) { 
  }

  // HTTP options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // Handle API Errors
  handleError(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent){
      console.error('An error occured :' + error.error.message);
    }
    else {
      console.log(error.error);
      console.error(
        `Backend returned code ${ error.status },`+
        `body was: ${ error.error }`
      );
    }
    return throwError(
      'Something bad happened; Please try again later.'
    )
  }

  postForm(data): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(this.basePath + 'api.php', data, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getData(data): Observable<LoginResponse>{
    return this.http
      .post<LoginResponse>(this.basePath + 'api.php', data, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
    
  setUser(resp: LoginResponse){
    localStorage.setItem('name',resp.name);
    localStorage.setItem('lang',resp.lang);
    localStorage.setItem('access_token',resp.access_token);
    this.router.navigate(['/dashboard']);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isLoggedIn(){
    let token = localStorage.getItem('access_token');
    let isExpired =new JwtHelperService().isTokenExpired(token);
    if (isExpired) return false;

    return true;
  }

  getTokenData(){
    let token = localStorage.getItem('access_token');
    let token_decoded = new JwtHelperService().decodeToken(token);
    return token_decoded['data']
  }
  
}
