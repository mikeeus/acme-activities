import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Registration } from '@acme-widgets/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationsService {

  constructor(private http: HttpClient) { }

  load(): Observable<Registration[]> {
    return this.http.get<Registration[]>('/registrations')
  }

  delete(registrationId: number): Observable<any> {
    return this.http.delete('/registrations/'+registrationId)
  }
}
