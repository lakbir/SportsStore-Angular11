import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenStorageService} from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuardGuard implements CanActivate {
  constructor(private tokenStorageService: TokenStorageService, private route: Router) {
  }

  canActivate(): boolean {
    let isLoggedIn = !!this.tokenStorageService.getToken();
    if (isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      if(user.roles.includes('ROLE_ADMIN')){
        console.log('Is a admin');
        return true;
      }else {
        console.log('Is not admin');
        this.route.navigate(['/']);
        return false;
      }

    }
  }

}
