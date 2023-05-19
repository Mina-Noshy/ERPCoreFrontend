import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { HttpClientConfig } from './httpClientConfig';
import { catchError, switchMap, throwError } from 'rxjs';
import { UserDetailsVM } from '../view-models/user-details-vm';
import { TokenService } from '../services/token.service';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor 
{
  constructor(private tokenService:TokenService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) 
  {
    const modifiedReq = request.clone(
    {
        url: request.url.includes('/assets/i18n/') ? request.url : HttpClientConfig.baseUrl + request.url,
        headers: new HttpHeaders(
        {
            'ApiKey': HttpClientConfig.apiKey,
            'Authorization': 'Bearer ' + this.tokenService.getUserDetails()?.token?? '',
        }),
        withCredentials: true
    });
    
    return next.handle(modifiedReq).pipe(
      catchError(error => {
        // Check if the error is an authorization error
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // Refresh the access token and retry the request
          return this.tokenService.refreshToken().pipe(
            switchMap((userDetails: UserDetailsVM) => {
              // Clone the original request and set the new authorization header
              const newAuthRequest = this.addAuthorizationHeader(modifiedReq.clone());

              // Retry the request with the new authorization header
              return next.handle(newAuthRequest);
            }),
            catchError(refreshError => {
              // Logout the user if the refresh token is invalid or expired
              this.tokenService.deleteUserDetails();

              // Rethrow the error to the caller
              return throwError(refreshError);
            })
          );
        } else {
          // Rethrow the error to the caller
          return throwError(error);
        }
      })
    );
  }

  private addAuthorizationHeader(request: HttpRequest<any>): HttpRequest<any> {
    // Get the access token from the auth service
    const accessToken = this.tokenService.getAccessToken();

    // Add the Authorization header to the request
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
        ApiKey: HttpClientConfig.apiKey
      }, 
      withCredentials: true
    });
  }

}