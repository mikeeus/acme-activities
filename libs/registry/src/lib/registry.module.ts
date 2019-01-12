import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  REGISTRY_FEATURE_KEY,
  initialState as registryInitialState,
  registryReducer
} from './+state/registry.reducer';
import { RegistryEffects } from './+state/registry.effects';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: fromContainers.RegistryComponent
      }
    ]),

    StoreModule.forFeature(REGISTRY_FEATURE_KEY, registryReducer, {
      initialState: registryInitialState
    }),

    EffectsModule.forFeature([RegistryEffects])
  ],
  declarations: [...fromContainers.containers]
})
export class RegistryModule {}
