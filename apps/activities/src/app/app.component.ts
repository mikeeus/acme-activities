import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './+state';

@Component({
  selector: 'acme-widgets-root',
  template: `
    <div class="container">
      <acme-widgets-header></acme-widgets-header>
      <div class="content">
        <router-outlet></router-outlet>
      </div>
      <acme-widgets-footer></acme-widgets-footer>
    </div>
  `,

  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.store.dispatch(new fromRoot.CheckRegistered)
  }
}
