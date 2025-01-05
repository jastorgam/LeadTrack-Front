import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { LoginResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = `${environment.leadApi}/Auth/login`;

  constructor(private http: HttpClient) {}

  login(email: string, pass: string): Observable<LoginResponse> {
    console.log(this.url);

    return this.http
      .post<LoginResponse>(this.url, { email, password: pass })
      .pipe(
        map((response) => {
          if (response === null) {
            throw new Error('Usuario no autorizado');
          }
          if (!environment.production) console.log('Response', response);
          sessionStorage.setItem('jwt', response.token);
          sessionStorage.setItem('role', response.role);
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Error en la solicitud HTTP:', error);
          return throwError(
            () =>
              new Error(
                'Error en el inicio de sesión. Por favor, inténtelo de nuevo.'
              )
          );
        })
      );
  }


}
