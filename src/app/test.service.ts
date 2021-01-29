import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {

   
  //input:any="00";



  async test(){
    let iframe =  document.querySelectorAll("iframe")[0];
    //let input =  <HTMLInputElement> iframe.contentWindow.document.getElementById("txt_1167");
    let input =  <HTMLInputElement> iframe.contentWindow.document.getElementById("fromage");
    let input1 =  <HTMLInputElement> iframe.contentWindow.document.getElementById("txt_1290");
    

    
      return   await input.value;
     
   }

  


 
}
