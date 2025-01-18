import {
  HttpClient,
  HttpErrorResponse,
  HttpEventType,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Prospect } from '../models/api-response';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LeadService {
  private apiUrl = environment.leadApi;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getProspects(): Observable<Prospect[]> {
    return this.http.get<Prospect[]>(`${this.apiUrl}/Lead/get-prospects`).pipe(
      map((response) => {
        if (response === null) {
          throw new Error('Error');
        }
        response.forEach((e) => (e.fullName = `${e.name} ${e.lastName}`));
        if (!environment.production) console.log('Response', response);
        return response;
      })
    );
  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http
      .post(`${this.apiUrl}/Lead/load-file-prospect`, formData)
      .pipe(
        map((response) => {
          if (response === null) {
            throw new Error('error');
          }
          if (!environment.production) console.log('Response', response);
          return response;
        })
      );
  }
}
