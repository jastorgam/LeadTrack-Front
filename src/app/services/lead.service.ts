import { HttpClient } from '@angular/common/http';
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
    return this.http.get<Prospect[]>(`${this.apiUrl}/Lead/prospects`).pipe(
      map((response) => {
        response.forEach((e) => {
          e.lastInteraction = e.interactions
            ? e.interactions[e.interactions.length - 1]
            : null;
        });
        if (!environment.production) console.log('Response', response);
        return response;
      })
    );
  }

  getProspectsCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/Lead/prospects/count`).pipe(
      map((response) => {
        console.log('Total', response);
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
