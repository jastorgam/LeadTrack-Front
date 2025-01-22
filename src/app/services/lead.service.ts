import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Interaction, Prospect } from '../models/api-response';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LeadService {
  private apiUrl = environment.leadApi;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getProspects(): Observable<Prospect[]> {
    return this.http.get<Prospect[]>(`${this.apiUrl}/Lead/listLeads`).pipe(
      map((response) => {
        if (!environment.production) console.log('Response', response);
        response.forEach((e) => {
          e.phones = e.phones ? e.phones : [];
          e.interactions = e.interactions ? e.interactions : [];
          e.emails = e.emails ? e.emails : [];
          e.lastInteraction = e.interactions
            ? e.interactions[e.interactions.length - 1]
            : null;
        });
        return response;
      })
    );
  }

  getProspect(id: string): Observable<Prospect> {
    return this.http.get<Prospect>(`${this.apiUrl}/Lead/${id}`).pipe(
      map((resp) => {
        if (!environment.production) console.log('Response', resp);

        resp.phones = resp.phones ? resp.phones : [];
        resp.interactions = resp.interactions ? resp.interactions : [];
        resp.emails = resp.emails ? resp.emails : [];
        resp.lastInteraction = resp.interactions
          ? resp.interactions[resp.interactions.length - 1]
          : null;

        return resp;
      })
    );
  }

  addInteraction(interaction: Interaction): Observable<Prospect> {
    return this.http
      .post<Prospect>(`${this.apiUrl}/Lead/addInteraction`, interaction)
      .pipe(
        map((response) => {
          if (!environment.production) console.log('Response', response);
          return response;
        })
      );
  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.apiUrl}/Lead/verifysavefile`, formData).pipe(
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
