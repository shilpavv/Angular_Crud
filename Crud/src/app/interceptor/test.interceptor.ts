import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

@Injectable()
export class TestInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    let commanurl='http://localhost:3000/'
    console.log(request)
    let newRequest=request.clone({
      url:commanurl+request.url
    }); 
    return next.handle(newRequest);
  }
}
