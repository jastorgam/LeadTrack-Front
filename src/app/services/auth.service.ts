import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
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
          response.role = response.role.toLowerCase();
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

  getToken(): string | null {
    return sessionStorage.getItem('jwt');
  }

  getRole(): string | null {
    return sessionStorage.getItem('role');
  }

  isAuthenticated() {
    return this.getRole() !== null;
  }

  logout() {
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('role');
  }
}
