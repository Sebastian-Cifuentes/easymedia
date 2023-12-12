import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { StorageService } from "../services/storage.service";

@Injectable()
export class Auth implements HttpInterceptor {

  constructor(
    private storageService: StorageService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // Clone the request and add the token to the request
    const token = this.storageService.getToken();
    if(token){
      const modifiedReq = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      });
      return next.handle(modifiedReq);
    }
    return next.handle(request);
  }
}
