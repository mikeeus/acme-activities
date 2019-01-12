import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as fromRoot from '../+state';
import { Observable } from 'rxjs';

@Injectable()
export class RegisteredGuard implements CanActivate {
  constructor(
    private store: Store<fromRoot.ActivitiesState>,
    private router: Router
  ) {}

  canActivate(_route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.store.select(fromRoot.activitiesQuery.getUser).pipe(
      map(user => {
        if (user) {
          return true;
        } else {
          this.router.navigate([''])
          return false;
        }
      })
    )
  }
}