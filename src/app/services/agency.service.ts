import { Agency } from './../models/agency';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  baseUrl="http://localhost:9000";
  constructor(private http:HttpClient) { }

 
 
  getAgencies(){

    return this.http.get<Agency>(`${this.baseUrl}/agency`,{headers:{skip:"true"}});  

  }


  getAgency(id: string){  
    return this.http.get<Agency>(`${this.baseUrl}/agency/${id}`,{headers:{skip:"true"}});  
  }  

  getCompany(id: number){  
    return this.http.get<Agency>(`${this.baseUrl}/agency/company/${id}`,{headers:{skip:"true"}});  
  }  

  patchAgency(name: string, color2:string) {  
    return this.http.patch(`${this.baseUrl}/agency/${name}`, color2,{headers:{skip:"true"}});
  }
}
