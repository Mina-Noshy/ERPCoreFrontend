import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PermissionService } from '../services/permission.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {

  constructor(private permissionService:PermissionService, private router:Router)
  {
  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const url = route?.routeConfig?.path?? '';

      if(this.permissionService.hasAccess(url))
      {
        return true;
      }
      else
      {
        this.router.navigate(['/access-denied']);
        return false;
      }
  }
  
}
