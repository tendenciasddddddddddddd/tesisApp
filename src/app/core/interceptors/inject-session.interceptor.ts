import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import {catchError,} from 'rxjs/operators';


@Injectable()
export class InjectSessionInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    try {
      const token = this.cookieService.get('token')
      let newRequest = request
      newRequest = request.clone(
        {
          setHeaders: {
            authorization: `Bearer ${token}`,
            CUSTOM_HEADER: 'HOLA'
          }
        }
      )
      return next.handle(newRequest).pipe(catchError(err  => {
        if ([401, 403, 405].includes(err.status)) {
          this.cookieService.delete('token')
          window.location.reload()
        }

        const error = err.error?.message || err.statusText;
        console.log(err);
        return Observable.throw(error);
    }))

    } catch (e) {
      console.log('🔴🔴🔴 Ojito error', e)
      return next.handle(request)
    }
  }
}
