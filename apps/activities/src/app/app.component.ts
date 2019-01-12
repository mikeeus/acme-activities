import { Component } from '@angular/core';

@Component({
  selector: 'acme-widgets-root',
  template: `
    <div class="container">
      <acme-widgets-header></acme-widgets-header>
      <router-outlet></router-outlet>
      <acme-widgets-footer></acme-widgets-footer>
    </div>
  `,

  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'activities';
}
