import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';

// ACTIVITIES COMPONENTS, SERVICES and GUARDS
import { AppComponent } from './app.component';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromGuards from './guards';
import * as fromServices from './services';

// ACME MODULES
import { RegistrationsModule } from '@acme-widgets/registrations';

// MOCK SERVER
import { fakeBackendProvider } from './interceptors';

// NGRX STORE
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  ACTIVITIES_FEATURE_KEY,
  initialState as activitiesInitialState,
  activitiesReducer
} from './+state/activities.reducer';
import { ActivitiesEffects } from './+state/activities.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';

const routes = [
  { path: '', component: fromContainers.HomeComponent },
  {
    path: 'registrations',
    loadChildren: '@acme-widgets/registry#RegistryModule',
    data: { title: 'Activity Registrations' },
    canActivate: [fromGuards.RegisteredGuard]
  },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    ...fromContainers.containers,
    ...fromComponents.components
  ],
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    RegistrationsModule,
    StoreModule.forRoot(
      { activities: activitiesReducer },
      {
        initialState: { activities: activitiesInitialState },
        metaReducers: !environment.production ? [storeFreeze] : []
      }
    ),
    EffectsModule.forRoot([ActivitiesEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule
  ],
  providers: [
    ...fromGuards.guards,
    ...fromServices.services,
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
