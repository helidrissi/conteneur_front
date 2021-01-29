import { data } from 'jquery';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './../services/token.service';
import { AccountService } from './../services/account.service';
import { TestService } from './../test.service';
import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Config } from '../config';

@Component({
  selector: 'app-marques',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})



export class MenuComponent implements OnInit {

  // url="http://192.63.63.102?hostgw=192.63.63.189&portgw=8008&alias=menu&theme=CORPORATE"
  //url="http://dev.saphir/acutoweb/?hostgw=dev.saphir&portgw=8008&alias=menu&theme=CORPORATE"
  //url="http://dev.saphir?hostgw=dev.saphir&portgw=8008&alias=menu&theme=CORPORATE"
  //url="http://192.63.63.189?hostgw=192.63.63.189&portgw=8008&alias=menu&theme=CORPORATE"



  // url="http://dev.saphir/acutoweb/?hostgw=dev.saphir&portgw=8008&alias=menu&theme=CORPORATE"

  source: string = '';
  alias: any;
  url:any;
  acutoweb:any;
  port:any
  userInfos: any;
  Config: Config;
  constructor(private route: ActivatedRoute,private test:TestService,private account:AccountService,private token:TokenService,private http:HttpClient) { }
  //url="http://dev.saphir/acutoweb/?hostgw=dev.saphir&portgw=8008&alias=ATE&theme=CORPORATE"
  ngOnInit(): void {

   

    /*this.http.get<Config>("http://devsaphir.mistral.fr:9890/conteneur-backend/config").subscribe(
      data => {
      
        //this.Config=data

        this.route.paramMap.subscribe(param => {
     
          this.alias = param.get('alias')
          console.log(param)
          this.url = "http://devsaphir.mistral.fr?hostgw=devsaphir.mistral.fr&portgw=8008&alias=" + this.alias + "&theme=CORPORATE"
         
         //this.url = "http://"+this.Config.url+"/?hostgw="+this.Config.url+"&portgw="+this.Config.port+"&alias="+ this.alias+"&theme=CORPORATE"
         
         //this.url="http://mis-test-saas.mistral.fr:443/?hostgw=mis-test-saas.mistral.fr&portgw=8008&alias=MENU&theme=CORPORATE"
       
     //  })
        
      });*/

   
      this.route.paramMap.subscribe(param => {
     
        this.alias = param.get('alias')
        console.log(param)
        this.url = "http://dev.saphir/acutoweb/?hostgw=dev.saphir&portgw=8008&alias=" + this.alias + "&theme=CORPORATE"
       
       //this.url = "http://"+this.Config.url+"/?hostgw="+this.Config.url+"&portgw="+this.Config.port+"&alias="+ this.alias+"&theme=CORPORATE"
       
      //  this.url="https://mis-test-saas.mistral.fr/?hostgw=mis-test-saas.mistral.fr&portgw=443&alias=MENU&theme=CORPORATE"
     
      })
    
  }
 
}
