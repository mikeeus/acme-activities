import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import * as fromComponents from './components';

const routes = [
  { path: '', component: fromContainers.HomeComponent },
  {
    path: 'registrations',
    loadChildren: '@acme-widgets/registry#RegistryModule',
    data: { title: 'Activity Registrations' }
  },
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
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
