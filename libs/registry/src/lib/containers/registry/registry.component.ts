import { Component, OnInit } from '@angular/core';

import * as fromFeature from '../../+state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Registration, User } from '@acme-widgets/models';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'acme-widgets-registry',
  template: `
    <div class="container">
      <h1>Registrations</h1>

      <div class="filter" *ngIf="filteredActivity">
        <strong>Filter </strong>
        <acme-widgets-activity
          [activity]="filteredActivity"
          (click)="filter(null)">
        </acme-widgets-activity>
      </div>

      <ul>
        <acme-widgets-registration-item
          *ngFor="let registration of filtered | async"
          [userEmail]="userRegistration?.email"
          [registration]="registration"
          (filter)="filter($event)"
          (delete)="deleteRegistration($event)">
        </acme-widgets-registration-item>
      </ul>
    </div>
  `,
  styleUrls: ['./registry.component.scss']
})
export class RegistryComponent implements OnInit {
  registrations: Observable<Registration[]>;
  userRegistration: Registration;
  filtered: Observable<Registration[]>;
  filteredActivity: string;

  constructor(private store: Store<fromFeature.RegistryState>) { }

  ngOnInit() {
    this.store.dispatch(new fromFeature.LoadRegistry)
    this.registrations = this.store.select(fromFeature.registryQuery.getAllRegistrations);
    this.userRegistration = new Registration(JSON.parse(localStorage.getItem('registration')));
    this.filtered = this.registrations;
  }

  deleteRegistration(registrationId: number) {
    this.store.dispatch(new fromFeature.DeleteRegistration(registrationId))
  }

  filter(activity: string) {
    this.filteredActivity = activity;
    if (activity) {
      this.filtered = this.registrations.pipe(
        map(reg => reg.filter(r => r.activity === activity))
      )
    } else {
      this.filtered = this.registrations;
    }
  }
}
