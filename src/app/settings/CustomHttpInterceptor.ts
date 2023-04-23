import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { HttpClientConfig } from './httpClientConfig';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor 
{

  intercept(request: HttpRequest<any>, next: HttpHandler) 
  {
    const modifiedReq = request.clone(
    {
        url: request.url.includes('/assets/i18n/') ? request.url : HttpClientConfig.baseUrl + request.url,
        headers: new HttpHeaders(
        {
            'ApiKey': HttpClientConfig.apiKey,
        })
    });
    return next.handle(modifiedReq);
  }
}