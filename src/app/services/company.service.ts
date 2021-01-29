import { Company } from './../models/company';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

 
  baseUrl="http://localhost:9000";
  constructor(private http:HttpClient) { }

 
 
  getCompanies(){

    return this.http.get<Company[]>(`${this.baseUrl}/company`,{headers:{skip:"true"}});  

  }


  getCompany(id: string){  
    return this.http.get<Company>(`${this.baseUrl}/company/${id}`,{headers:{skip:"true"}});  
  }  

  patchCompany(name: string, color1:string) {  
    return this.http.patch(`${this.baseUrl}/company/${name}`, color1,{headers:{skip:"true"}});
  }
}
