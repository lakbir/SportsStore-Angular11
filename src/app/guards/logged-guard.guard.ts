import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenStorageService} from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuardGuard implements CanActivate {

  constructor(private tokenStorageService: TokenStorageService, private route: Router) {
  }

  canActivate(): boolean {
    let isLoggedIn = !!this.tokenStorageService.getToken();
    if(isLoggedIn){
      return true;
    }else {
      this.route.navigate(['/']);
      return false;
    }
  }

}
