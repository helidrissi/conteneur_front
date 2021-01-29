import { Config } from './../config';
import { HttpClient } from '@angular/common/http';
import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
//   Config: Config;
  

//   constructor(private http:HttpClient) { }

//   ngOnInit(): void {

// this.getConfig()
//   }

//   getConfig()

//   {
       
//     this.http.get<Config>("http://localhost:8000/test").subscribe(
//       data => {
//         // this.Config= data;
//         // alert(this.Config.port);
//         // alert(this.Config.url);
        
//       }
//     );
//   }
hamza:any;
constructor() { }

ngOnInit(): void {

this.testAcubench();
 
}

testAcubench() {
  alert("jkzefhehf")
   

   }


}
