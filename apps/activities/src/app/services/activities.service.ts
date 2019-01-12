import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Registration } from '@acme-widgets/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  constructor(private http: HttpClient) {}

  register(registration: Registration): Observable<Registration> {
    return this.http.post<Registration>('/registrations', registration)
  }
}
