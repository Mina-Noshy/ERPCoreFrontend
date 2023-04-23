import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetailsVM } from '../view-models/user-details-vm';
import { LoginVM } from '../view-models/login-vm';
import { LocalStorageValues } from '../static-values/local-storage-values';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  isAuthorize():boolean
  {
    let currUser = this.getUserDetails();
    
    if(currUser?.isAuthenticated) return true;
    else return false;
  }

  login(credintials:LoginVM) : any
  {
    return this.http.post('/auth/getToken', credintials);
  }

  logout():void
  {
    localStorage.removeItem(LocalStorageValues.user_details);
  }

  register():boolean
  {
    return false;
  }

  getUserDetails():UserDetailsVM
  {
    let userJson = localStorage.getItem(LocalStorageValues.user_details);

    if(userJson) return JSON.parse(userJson) as UserDetailsVM;
    else return new UserDetailsVM();
  }
}
