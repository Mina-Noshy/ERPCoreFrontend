import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { PageGroupFormVM } from '../view-models/page-group-form-vm';
import { TokenService } from './token.service';
import { StringVM } from '../view-models/string-vm';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private http: HttpClient, private tokenService: TokenService) { } 

  insertPageGroup(model: PageGroupFormVM):Observable<StringVM>
  {
    let currUserName = this.tokenService.getUserName();
    model.createdBy = currUserName;

    return this.http.post('pageGroups/insert', model).pipe(
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

  updatePageGroup(model: PageGroupFormVM):Observable<StringVM>
  {
    let currUserName = this.tokenService.getUserName();
    model.modifiedBy = currUserName;

    return this.http.post(`pageGroups/update/${model.id}`, model).pipe(
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
