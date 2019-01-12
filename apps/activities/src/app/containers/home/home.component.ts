import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'acme-widgets-home',
  template: `
    <acme-widgets-registration-form></acme-widgets-registration-form>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
