import { Component, OnInit } from '@angular/core';

import * as fromFeature from '../../+state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Registration, User } from '@acme-widgets/models';

@Component({
  selector: 'acme-widgets-registry',
  template: `
    <ul>
      <li *ngFor="let registration of registrations | async">
        {{registration.id}}
        {{registration.firstName}}
        {{registration.lastName}}
        {{registration.email}}
        {{registration.activity}}
        <button
          *ngIf="userRegistration?.email === registration.email"
          (click)="deleteRegistration(registration.id)">
          Delete
        </button>
      </li>
    </ul>
  `,
  styleUrls: ['./registry.component.scss']
})
export class RegistryComponent implements OnInit {
  registrations: Observable<Registration[]>;
  userRegistration: Registration;

  constructor(private store: Store<fromFeature.RegistryState>) { }

  ngOnInit() {
    this.store.dispatch(new fromFeature.LoadRegistry)
    this.registrations = this.store.select(fromFeature.registryQuery.getAllRegistrations);
    this.userRegistration = new Registration(JSON.parse(localStorage.getItem('registration')));
  }

  deleteRegistration(registrationId: number) {
    this.store.dispatch(new fromFeature.DeleteRegistration(registrationId))
  }
}
