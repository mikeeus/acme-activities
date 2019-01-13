import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Activity } from '@acme-widgets/models';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';
import { map, merge, withLatestFrom, switchMap } from 'rxjs/operators';

@Component({
  selector: 'acme-widgets-registration-form',
  template: `
  <form [formGroup]="form">
    <h2>Sign Up For ACME Activities!</h2>
  
    <div class="step" *ngIf="(step | async)?.name === 'name'">
      <acme-widgets-form-control
        label="First Name"
        [control]="firstName">
        <input
          formControlName="firstName"
          type="text"
          class="form-control"
          required>
      </acme-widgets-form-control>
    
      <acme-widgets-form-control
        label="Last Name"
        [control]="lastName">
        <input
          formControlName="lastName"
          type="text"
          class="form-control"
          required>
      </acme-widgets-form-control>
    </div>

    <div class="step" *ngIf="(step | async)?.name === 'email'">
      <acme-widgets-form-control
        label="Email"
        [control]="email">
        <input
          formControlName="email"
          type="text"
          class="form-control"
          required>
      </acme-widgets-form-control>
    </div>
  
    <div class="step" *ngIf="(step | async)?.name === 'activity'">
      <acme-widgets-form-control
        label="Acitivity"
        [control]="activity">
        <select formControlName="activity">
          <option *ngFor="let option of activities" value="{{option.name}}">
            {{option.name}}
          </option>
        </select>
      </acme-widgets-form-control>
    </div>
  
    <div class="step" *ngIf="(step | async)?.name === 'comments'">
      <acme-widgets-form-control label="Comments" [control]="comments">
        <textarea
          formControlName="comments"
          type="text"
          class="form-control"
          rows="10">
        </textarea>
      </acme-widgets-form-control>
    </div>

    <div class="controls">
      <button
        type="button"
        *ngIf="(step | async)?.prev"
        (click)="prevStep()">
        Back
      </button>

      <button
        type="button"
        *ngIf="(step | async)?.next !== 'done'"
        [disabled]="!(stepValid | async)"
        (click)="nextStep()"
        style="margin-left: auto;">
        Next
      </button>

      <button
        *ngIf="(step | async)?.next === 'done'"
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
  step: BehaviorSubject<RegistrationStep>;
  stepValid: Observable<boolean>;
  steps;
  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['Mikias', [Validators.required, Validators.minLength(2)]],
      lastName: ['Abera', [Validators.required, Validators.minLength(2)]],
      email: ['mikias@email.com', [Validators.required, Validators.email]],
      activity: ['Initial Coin Offering', [Validators.required, Validators.minLength(2)]],
      comments: ['Test'],
    });

    this.step = new BehaviorSubject({
      name: 'name',
      controls: [this.firstName, this.lastName],
      next: 'email',
      prev: null
    })

    this.steps = {
      name: {
        name: 'name',
        controls: [this.firstName, this.lastName],
        next: 'email'
      },
      email: {
        name: 'email',
        controls: [this.email],
        prev: 'name',
        next: 'activity'
      },
      activity: {
        name: 'activity',
        controls: [this.activity],
        prev: 'email',
        next: 'comments'
      },
      comments: {
        name: 'comments',
        controls: [],
        prev: 'activity',
        next: 'done'
      }
    }

    this.stepValid = this.form.valueChanges.pipe(
      withLatestFrom(this.step),
      map(([_formValue, step]) => this.validate(step.controls))
    )
    this.stepValid.subscribe(val => console.log('stepValid: ', val))
  }

  get firstName() { return this.form.get('firstName'); }
  get lastName() { return this.form.get('lastName'); }
  get email() { return this.form.get('email'); }
  get activity() { return this.form.get('activity'); }
  get comments() { return this.form.get('comments'); }

  submitForm() {
    this.submit.emit(this.form.value)
  }

  validate(controls: AbstractControl[]): boolean {
    console.log(controls)
    return controls.length === 0 ||
      controls.map((c: AbstractControl) => c.valid)
              .indexOf(false) === -1;
  }

  nextStep() {
    this.step.next(this.steps[this.step.value.next])
  }

  prevStep() {
    this.step.next(this.steps[this.step.value.prev])
  }
}

export interface RegistrationStep {
  name: string;
  prev: string;
  next: string;
  controls: AbstractControl[]
}