import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable()
export class RegisteredGuard implements CanActivate {
  constructor(
    private router: Router
  ) {}

  canActivate(_route: ActivatedRouteSnapshot): boolean {
    const registration = localStorage.getItem('registration');
    if (registration) {
      return true;
    } else {
      this.router.navigate([''])
      return false;
    }
  }
}