import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StringVM } from '../view-models/string-vm';
import { Observable, catchError, map } from 'rxjs';
import { UserListVM } from '../view-models/user-list-vm';
import { LocalStorageValues } from '../static-values/local-storage-values';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getAllUsers():Observable<UserListVM[]> {
    return this.http.get('account/getAllUsers').pipe(
      map((response: any) => {
        let users = response as UserListVM[];
        return users;
      }),
      catchError(error => {
        // Handle any errors that occur during the request
        console.error('Error:', error);
        throw error;
      })
    );
  }
 
  deleteUser(userId: StringVM):Observable<StringVM> {

    return this.http.post('account/deleteUser', userId).pipe(
      map((response: any) => {
        return response as StringVM;
      }),
      catchError(error => {
        // Handle any errors that occur during the request
        console.error('Error:', error);
        throw error;
      })
    );
  }

  toggleConfirmeEmail(email: StringVM):Observable<StringVM> {

    return this.http.post('account/toggleEmailConfirmation', email).pipe(
      map((response: any) => {
        return response as StringVM;
      }),
      catchError(error => {
        // Handle any errors that occur during the request
        console.error('Error:', error);
        throw error;
      })
    );
  }

}
