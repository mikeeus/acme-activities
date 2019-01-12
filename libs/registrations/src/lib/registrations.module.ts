import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '@acme-widgets/core';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule
  ],
  declarations: [
    RegistrationFormComponent
  ],
  exports: [
    RegistrationFormComponent
  ]
})
export class RegistrationsModule {}
