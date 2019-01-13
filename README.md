# AcmeWidgets

This is an activities sign up application to be used internally be ACME employees. You can visit the app at: https://acme-widgets.mikias.net/.

To run locally clone the repository, cd into it and run `yarn` or `npm install` then `ng serve` which will start the server on port 4200.

## Nrwl Nx

I used [Nrwl Nx]((http://nrwl.io/nx)) to generate applications, libs and ngrx store because I find their default templates to be effective for organizing an Angular application.

## App Organization

The main [activities app](apps/activities/src/app/app.module.ts) lives at `apps/activities/`. It holds the `HomeComponent` which is for the `/` route. It also holds state for the registration form and handlers the `register` action.

 The [Registry][libs/registry/src/lib/registry.module.ts] module is lazy loaded and and secured with a route guard to make sure only users who have registered are able to access it.

 The [Models lib][libs/models/src/index.ts] is responsible for holding the models that are used in the application. I choose to use classes instead of interfaces because it enables me to add instance methods and static properties with little effort.

apps/
  activities/
    home.component (container)
    footer.component
    header.component
libs/
  core
    form-control.component
  models
    registration.model
    activity.model
  registrations
    registration-form
  registry
    registry.component (container)
    registry-item.component
    activity.component


## Mock Backend

To mock the backend I use a [FakeBackendInterceptor](apps/activities/src/app/interceptors/fake-backend.interceptor.ts) that intercepts http requests and returns values after a 500ms delay to simulate an api call. It was inspired by a [blog post by Jason Watmore](http://jasonwatmore.com/post/2018/06/22/angular-6-mock-backend-example-for-backendless-development) and is easy to setup and use.

## Running unit tests

Run `ng test` to execute the unit tests via Jest. I chose [Jest](https://jestjs.io/) because it is fast and easy to use.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Cypress](https://www.cypress.io/). I chose cypress because it allows for concise and easy to read tests. The test runner is also super fast and makes it easy to develop while watching for changes to the app.
