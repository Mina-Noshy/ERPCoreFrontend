import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { UserDetailsVM } from '../view-models/user-details-vm';
import { LoginVM } from '../view-models/login-vm';
import { LocalStorageValues } from '../static-values/local-storage-values';
import { RegisterVM } from '../view-models/register-vm';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
 
  
  login(credintials:LoginVM):Observable<UserDetailsVM>
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
 
  logout():void
  {
    localStorage.removeItem(LocalStorageValues.user_details);
  }

  register(credintials: RegisterVM):Observable<UserDetailsVM>
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
