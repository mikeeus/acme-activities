import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import * as fromContainers from './containers';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: fromContainers.RegistryComponent}
    ])
  ],
  declarations: [
    ...fromContainers.containers
  ]
})
export class RegistryModule {}
