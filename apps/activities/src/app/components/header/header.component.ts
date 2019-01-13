import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'acme-widgets-header',
  template: `
    <header>
      <div class="brand">ACME <small>Widgets</small></div>
    </header>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
