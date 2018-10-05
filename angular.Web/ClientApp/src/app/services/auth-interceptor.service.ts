import { Injectable } from '@angular/core';
import { AccountService } from '../account/account.service';
import { HttpInterceptor, HttpUserEvent, HttpResponse, HttpProgressEvent, HttpHeaderResponse, HttpSentEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private accountService: AccountService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    var token = this.accountService.getToken();

    // Clone request and add token to headers. Don't forget the space after bearer
    req = req.clone({
      setHeaders: { Authorization: "bearer " + token }
    });
    return next.handle(req);
  }
}
