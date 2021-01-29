import { data } from 'jquery';
import { Users } from '../models/users';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl="http://localhost:9000";
  constructor(private http:HttpClient) { }

  // getUser(id: string) {
  //   return this.http.get(`${this.baseUrl}/${id}`);
  // }
   getUsers()
   {

    return this.http.get<Users[]>(`${this.baseUrl}/users`);  
  }


  AddUser(data:Users)
  {
   
    return this.http.post(`${this.baseUrl}/users`,data)
  
  }

  getUser(id: string){  
    return this.http.get<Users>(`${this.baseUrl}/users/${id}`);  
  }  

  patchUser(id: any, data:{firstName:string,lastName:string,email:string,password:string}) {  
    return this.http.patch(`${this.baseUrl}/users/${id}`, data);
  }
 
  

  delete(element: Users ) {
    const url = `${this.baseUrl}/delete/${element.id}`;
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.get(url, { headers, responseType: 'text'});
  }


  update(id:any, data:{firstName:string,lastName:string,email:string,password:string}): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${id}`, data);
  }

  


  getAllUser() {
    return this.http.get<Users[]>(`${this.baseUrl}`);
  }

 

  getOrdreOptions() {
    let list: Array<string> = [];
    for (let i = 0; i < 25; i++) {
      list.push(String(i + 1));
    }
    return list;
  }

  refrechOrdreInUsersArray(users: Users[]) {

    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      user.ordreAffichage = i + 1;
    }
    const url = `${this.baseUrl}/update_users_order`;
    return this.http.post(url, users);
  }
}
