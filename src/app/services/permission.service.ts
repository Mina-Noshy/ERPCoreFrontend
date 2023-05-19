import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private tokenService:TokenService) { }

  hasAccess(url: string): boolean{
    
    const currUser = this.tokenService.getUserDetails();
    
    if(currUser.permissions?.find(x => x.pageUrl === url)){
      return true;
    }
    else{
      return false;
    }

  }
}
