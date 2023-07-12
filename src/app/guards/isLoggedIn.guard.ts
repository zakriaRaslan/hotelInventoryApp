import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "../Components/login/login.service";



@Injectable({
  providedIn:'root',
})
export class IsLoggedInGuard implements CanActivate {
  constructor(private loginService:LoginService,private router:Router) {}

  canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    return this.loginService.isLoggedIn?true:this.router.navigate(['noAccess'])
  }
}
