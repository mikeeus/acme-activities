import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { Registration } from '@acme-widgets/models';
 
// Inspired by http://jasonwatmore.com/post/2018/06/22/angular-6-mock-backend-example-for-backendless-development
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const registry: Registration[] = JSON.parse(localStorage.getItem('registry')) || defaultRegistry;

    return of(null).pipe(
      mergeMap(() => {
        if (request.url.endsWith('/registrations') && request.method === 'GET') {
          return of(new HttpResponse({ body: registry, status: 200 }))
        }

        /**
         * POST /registrations
         * Create registration, update registry in localStorage and return 
         * registration with 201
         */
        if (request.url.endsWith('/registrations') && request.method === 'POST') {
          const registration = new Registration(request.body)

          if (registry.map(r => r.id).indexOf(registration.id) === -1) {
            registry.unshift(registration)
            localStorage.setItem('registry', JSON.stringify(registry))
          }

          return of(new HttpResponse({body: registration, status: 201}))
        }

        /**
         * DELETE /registration/:id
         * Filter registration out of registry. Return 200.
         */
        if (request.url.match(/\/registrations\/\d+$/) && request.method === 'DELETE') {
          const urlParts = request.url.split('/');
          const id = parseInt(urlParts[urlParts.length - 1], 10)
          const updatedRegistry = registry.filter(r => r.id !== id)
          localStorage.setItem('registry', JSON.stringify(updatedRegistry))

          return of(new HttpResponse({status: 200}))
        }

        // pass through any requests not handled above
        return next.handle(request)
      }),
      materialize(),
      delay(500),
      dematerialize())
  }
}

export let fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
}

const defaultRegistry = [
  new Registration({
    id: 6,
    firstName: 'Richard',
    lastName: 'Hendricks',
    email: 'richard@piedpiper.com',
    activity: 'Initial Coin Offering',
    comments: 'Crypto is the future!'
  }),
  new Registration({
    id: 5,
    firstName: 'Dinesh',
    lastName: 'Chugtai',
    email: 'dinesh@piedpiper.com',
    activity: 'Company Breakfast',
    comments: 'Sounds delicious!'
  }),
  new Registration({
    id: 4,
    firstName: 'Gavin',
    lastName: 'Belson',
    email: 'gavin@hooli.com',
    activity: "Gavin's Comeback Party",
    comments: "I'm back!"
  }),
  new Registration({
    id: 3,
    firstName: 'Jared',
    lastName: 'Dunn',
    email: 'jared@piedpiper.com',
    activity: 'Initial Coin Offering',
    comments: 'Richard will be here, right?'
  }),
  new Registration({
    id: 2,
    firstName: 'Monica',
    lastName: 'Hall',
    email: 'monica@piedpiper.com',
    activity: 'Initial Coin Offering',
    comments: "I can't believe I got roped into this!"
  }),
  new Registration({
    id: 1,
    firstName: 'Laurie',
    lastName: 'Bream',
    email: 'laurie@bream.com',
    activity: 'Hostile Takeover',
    comments: "Yes..."
  }),
]