import { Component, OnInit } from '@angular/core';

import * as fromFeature from '../../+state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Registration } from '@acme-widgets/models';

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
      </li>
    </ul>
  `,
  styleUrls: ['./registry.component.scss']
})
export class RegistryComponent implements OnInit {
  registrations: Observable<Registration[]>;

  constructor(private store: Store<fromFeature.RegistryState>) { }

  ngOnInit() {
    this.store.dispatch(new fromFeature.LoadRegistry)

    this.registrations = this.store.select(fromFeature.registryQuery.getAllRegistrations);
  }

}
