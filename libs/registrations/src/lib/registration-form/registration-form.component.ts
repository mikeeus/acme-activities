import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Activity } from '@acme-widgets/models';

@Component({
  selector: 'acme-widgets-registration-form',
  template: `
  <form [formGroup]="form">
    <h2>Sign Up For ACME Activities!</h2>
  
    <acme-widgets-form-control label="First Name" [control]="firstName">
      <input formControlName="firstName" type="text" class="form-control" required>
    </acme-widgets-form-control>
  
    <acme-widgets-form-control label="Last Name" [control]="lastName">
      <input formControlName="lastName" type="text" class="form-control" required>
    </acme-widgets-form-control>
  
    <acme-widgets-form-control label="Email" [control]="email">
      <input formControlName="email" type="text" class="form-control" required>
    </acme-widgets-form-control>
  
    <acme-widgets-form-control label="Acitivity" [control]="activity">
      <select formControlName="activity">
        <option *ngFor="let option of activities" value="{{option.name}}">
          {{option.name}}
        </option>
      </select>
    </acme-widgets-form-control>
  
    <acme-widgets-form-control label="Comments" [control]="comments">
      <textarea formControlName="comments" type="text" class="form-control"></textarea>
    </acme-widgets-form-control>
  
    <div class="controls">
      <button
        [disabled]="form.invalid"
        (click)="submitForm(); $event.preventDefault()">
        Submit
      </button>
    </div>
  </form>
  `,
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  @Output() submit = new EventEmitter<any>();
  @Input() activities: Activity[];

  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['Mikias', [Validators.required, Validators.minLength(2)]],
      lastName: ['Abera', [Validators.required, Validators.minLength(2)]],
      email: ['mikias@email.com', [Validators.required, Validators.email]],
      activity: ['Initial Coin Offering', [Validators.required, Validators.minLength(2)]],
      comments: ['Test'],
    })
  }

  get firstName() { return this.form.get('firstName'); }
  get lastName() { return this.form.get('lastName'); }
  get email() { return this.form.get('email'); }
  get activity() { return this.form.get('activity'); }
  get comments() { return this.form.get('comments'); }

  submitForm() {
    this.submit.emit(this.form.value)
  }
}
