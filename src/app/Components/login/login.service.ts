import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
isLoggedIn:boolean=false;
  constructor() { }

  login(email:string,password:string){
    if(email =='admin123@test.com' && password=='admin123'){
    return this.isLoggedIn=true
    }
    return this.isLoggedIn
  }
}



