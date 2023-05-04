import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StringVM } from '../view-models/string-vm';
import { Observable, catchError, map } from 'rxjs';
import { UserVM } from '../view-models/user-vm';
import { LocalStorageValues } from '../static-values/local-storage-values';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getAllUsers():Observable<UserVM[]> {
    return this.http.get('account/getAllUsers').pipe(
      map((response: any) => {
        let users = response as UserVM[];
        return users;
      }),
      catchError(error => {
        // Handle any errors that occur during the request
        console.error('Error:', error);
        throw error;
      })
    );
  }
 
  toggleConfirmeEmail(model: StringVM):Observable<boolean> {

    return this.http.post('account/toggleEmailConfirmation', model).pipe(
      map((response: any) => {
        let result = response as boolean;
        return result;
      }),
      catchError(error => {
        // Handle any errors that occur during the request
        console.error('Error:', error);
        throw error;
      })
    );
  }

}
