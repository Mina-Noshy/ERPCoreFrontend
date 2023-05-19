import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { UserDetailsVM } from '../view-models/user-details-vm';
import { LoginFormVM } from '../view-models/login-form-vm';
import { LocalStorageValues } from '../static-values/local-storage-values';
import { RegisterFormVM } from '../view-models/register-form-vm';
import { StringVM } from '../view-models/string-vm';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private tokenService:TokenService) { }
 
  
  login(credintials:LoginFormVM):Observable<UserDetailsVM>
  { 
    return this.http.post('auth/getToken', credintials).pipe(
      map((response: any) => {
        let userDetails = response as UserDetailsVM;
        
        localStorage.setItem(LocalStorageValues.user_details, JSON.stringify(userDetails));
        return userDetails;
      }),
      catchError(error => {
        // Handle any errors that occur during the request
        console.error('Error:', error);
        throw error;
      })
    );
  }
 
  logout():Observable<string> {

    let model:StringVM = new StringVM();
    model.value = this.tokenService.getRefreshToken();
    
    this.tokenService.deleteUserDetails();

    return this.http.post('auth/revokeToken', model).pipe(
      map((response: any) => {
        let result = response as string;
        return result;
      }),
      catchError(error => {
        // Handle any errors that occur during the request
        console.error('Error:', error);
        throw error;
      })
    );

  }

  register(credintials: RegisterFormVM):Observable<UserDetailsVM>
  {
    return this.http.post('auth/register', credintials).pipe(
      map((response: any) => {
        let userDetails = response as UserDetailsVM;
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
