import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { UserDetailsVM } from '../view-models/user-details-vm';
import { StringVM } from '../view-models/string-vm';
import { LocalStorageValues } from '../static-values/local-storage-values';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: HttpClient) { }

  isAuthorize():boolean
  {
    let currUser = this.getUserDetails();
    
    if(currUser?.isAuthenticated) return true;
    else return false;
  }

  getUserDetails():UserDetailsVM
  {
    let userJson = localStorage.getItem(LocalStorageValues.user_details);

    if(userJson) return JSON.parse(userJson) as UserDetailsVM;
    else return new UserDetailsVM();
  }

  setUserDetails(model: UserDetailsVM):void
  {
    localStorage.setItem(LocalStorageValues.user_details, JSON.stringify(model));
  }

  deleteUserDetails():void
  {
    localStorage.removeItem(LocalStorageValues.user_details);
  }

  getAccessToken():string
  {
    return this.getUserDetails()?.token ?? '';
  }

  getRefreshToken():string
  {
    return this.getUserDetails()?.refreshToken ?? '';
  }

  refreshToken():Observable<UserDetailsVM>
  {
    let model:StringVM = new StringVM();
    model.value = this.getRefreshToken();

    return this.http.post('auth/refreshToken', model).pipe(
      map((response: any) => {
        let userDetails = response as UserDetailsVM;
        
        // update user details in local storage
        this.setUserDetails(userDetails);

        return userDetails;
      }),
      catchError(error => {
        // Handle any errors that occur during the request
        console.error('Error:', error);
        throw error;
      })
    );
  }
  
}
