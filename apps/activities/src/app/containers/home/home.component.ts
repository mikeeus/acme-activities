import { Component, OnInit } from '@angular/core';
import * as fromRoot from '../../+state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'acme-widgets-home',
  template: `
    <acme-widgets-registration-form [activities]="activities | async">
    </acme-widgets-registration-form>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  activities: Observable<string[]>;

  constructor(private store: Store<fromRoot.ActivitiesState>) { }

  ngOnInit() {
    this.store.dispatch(new fromRoot.LoadActivities)
    this.activities = this.store.select(fromRoot.activitiesQuery.getAllActivities)
  }
}
