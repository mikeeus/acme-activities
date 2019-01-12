import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'acme-widgets-form-control',
  template: `
    <label
      *ngIf="control"
      [ngClass]="{error: control.invalid && (control.dirty || control.touched)}">
      <div class="text">{{label}}</div>
    
      <ng-content></ng-content>
    </label>
    
    <div class="errors">
      <ng-container *ngIf="control && control.invalid && (control.dirty || control.touched)">
        <small *ngIf="control.hasError('required')">
          {{label}} is required.
        </small>

        <small *ngIf="control.hasError('minlength')">
          {{label}} must be at least {{minLength}} characters long.
        </small>

        <small *ngIf="control.hasError('email')">
          {{label}} must be a valid email.
        </small>
      </ng-container>
    </div>
  `,
  styleUrls: ['./form-control.component.scss']
})
export class FormControlComponent implements OnInit {
  @Input() control: FormControl;
  @Input() label: string;
  @Input() minLength = 2;

  constructor() { }

  ngOnInit() {
  }
}
