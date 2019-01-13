import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Registration } from '@acme-widgets/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrationsService {

  constructor(private http: HttpClient) { }

  load(): Observable<Registration[]> {
    return this.http.get<Registration[]>('/registrations').pipe(
      map(reg => reg.map(r => new Registration(r)))
    )
  }

  delete(registrationId: number): Observable<any> {
    return this.http.delete('/registrations/'+registrationId)
  }
}
