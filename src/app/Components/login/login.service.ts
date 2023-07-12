import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
isLoggedIn:boolean=false;
isAdmin:boolean=false
  constructor() { }

  login(email:string,password:string){
    if(email =='admin123@test.com' && password=='admin123'){
    this.isLoggedIn=true;
    this.isAdmin=true;
    }if(email =='user123@test.com' && password=='user123'){
      this.isLoggedIn=true;
      this.isAdmin=false
    }
   return this.isLoggedIn
  }
}



