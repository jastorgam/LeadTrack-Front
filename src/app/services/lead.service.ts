import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Interaction, Prospect } from '../models/api.model';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';
import { LeadReport } from '../models/report.model';
import { UpdateProspect } from '../models/update.model';

@Injectable({
  providedIn: 'root',
})
export class LeadService {
  private apiUrl = environment.leadApi;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHttpOptions() {
    const token = this.authService.getToken();
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  getReport(): Observable<LeadReport> {
    return this.http.get<LeadReport>(
      `${this.apiUrl}/Lead/getReport`,
      this.getHttpOptions()
    );
  }

  getProspects(): Observable<Prospect[]> {
    return this.http
      .get<Prospect[]>(`${this.apiUrl}/Lead/listLeads`, this.getHttpOptions())
      .pipe(
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
    return this.http
      .get<Prospect>(`${this.apiUrl}/Lead/${id}`, this.getHttpOptions())
      .pipe(
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

  updateProspect(prospect: UpdateProspect): Observable<Prospect> {
    return this.http.put<Prospect>(
      `${this.apiUrl}/Lead`,
      prospect,
      this.getHttpOptions()
    );
  }

  addInteraction(interaction: Interaction): Observable<Prospect> {
    return this.http
      .post<Prospect>(
        `${this.apiUrl}/Lead/addInteraction`,
        interaction,
        this.getHttpOptions()
      )
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
    return this.http
      .post(
        `${this.apiUrl}/Lead/verifysavefile`,
        formData,
        this.getHttpOptions()
      )
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
