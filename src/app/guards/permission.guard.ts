import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {

  constructor(private tokenService:TokenService, private router:Router)
  {
  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const url = route?.routeConfig?.path?? '';

      const currUser = this.tokenService.getUserDetails();
    
      if(currUser.permissions?.find(x => x.pageUrl === url)){
        return true;
      }
      else{
        this.router.navigate(['/access-denied']);
        return false;
      }

  }
  
}
