import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResetService {

  constructor(private http:HttpClient) { }


  forgotPwd(data:{email:string})
  {
    return this.http.post("http://localhost:9000/forgot",data, {headers:{skip:"true"}})
  }

  forgotPwd2(data:{password:string,confirmPassword:string,token:string})
  {
    return this.http.post("http://localhost:9000/reset-password",data,{headers:{skip:"true"}})
  }

}
