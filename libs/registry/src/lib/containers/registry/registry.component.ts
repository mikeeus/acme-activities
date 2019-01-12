import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'acme-widgets-registry',
  template: `
    <p>
      registry works!
    </p>
  `,
  styleUrls: ['./registry.component.scss']
})
export class RegistryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
