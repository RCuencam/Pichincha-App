import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authorId = 200;
    const headers = new HttpHeaders({
      'authorId': authorId
    });

    const new_req = req.clone({
      headers
    });

    return next.handle(new_req).pipe(
      catchError(err => throwError(err))
    )
  }
}
