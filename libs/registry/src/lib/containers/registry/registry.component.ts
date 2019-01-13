import { Component, OnInit } from '@angular/core';

import * as fromFeature from '../../+state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Registration, User } from '@acme-widgets/models';

@Component({
  selector: 'acme-widgets-registry',
  template: `
    <div class="container">
      <ul>
        <li *ngFor="let registration of registrations | async">
          <strong>
            {{registration.firstName}} {{registration.lastName}}
          </strong>
          <div class="{{registration.activityClass}}">
            {{registration.activity}}
          </div>
          <button
            class="delete"
            *ngIf="userRegistration?.email === registration.email"
            (click)="deleteRegistration(registration.id)">
            Cancel
          </button>
        </li>
      </ul>
    </div>
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
