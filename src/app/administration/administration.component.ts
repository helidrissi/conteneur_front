import { AgencyService } from './../services/agency.service';
import { CompanyService } from './../services/company.service';
import { UsersService } from './../services/users.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {
  succesMessage:String;
  errorMessage:string;
  userInfos:any;
  envir:any;
  constructor(private account:AccountService,private token:TokenService,private httpClient:HttpClient,public fb: FormBuilder,private agencyservice:AgencyService,private servicecompany:CompanyService) { }
  showMsgA: boolean = false;
  showMsgL: boolean = false;
  selectedFile: File;
  userId:string;
  retrievedImage: any;

  base64Data: any;

  retrieveResonse: any;

  message: string;

  imageName: any;


  //Gets called when the user selects an image
  formSociete=new FormGroup({
    color: new FormControl('#5BC5F1', Validators.required)
    


  })

  formAgence=new FormGroup({
    color: new FormControl('#5BC5F1', Validators.required)
    


  })
  patchColorS(): void {
   
    this.errorMessage = "";
    this.succesMessage = "";
   
  
    this.servicecompany.patchCompany(this.userInfos.company,this.formSociete.get('color').value)
         .subscribe( data => {
          
          
          }, error => {
            if(error.status === 200) {
              this.succesMessage = "";
               
            }
            else if (error.status === 500) {
              this.errorMessage = "";
          
            }
            else if (error.status === 416) {
              this.errorMessage = "";
           
            }
           
            else{
              this.errorMessage = "";
            
            };
          7
          });

        }

  patchColorA(): void {
   
          this.errorMessage = "";
          this.succesMessage = "";
         
        
          this.agencyservice.patchAgency(this.userInfos.agence,this.formAgence.get('color').value)
               .subscribe( data => {
                
                
                }, error => {
                  if(error.status === 200) {
                    this.succesMessage = "";
                     
                  }
                  else if (error.status === 500) {
                    this.errorMessage = "";
                
                  }
                  else if (error.status === 416) {
                    this.errorMessage = "";
                 
                  }
                 
                  else{
                    this.errorMessage = "";
                  
                  };
                7
                });
      
              }


  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
    
    console.log(this.selectedFile.name)
  }
  //Gets called when the user clicks on submit to upload the image

 
    //Gets called when the user clicks on retieve image button to get the image from back end  
  ngOnInit(): void {
    $(document).ready(function () {})
    
    this.account.authStatus.subscribe(
      res=>{
        this.userInfos = this.token.getInfos();
        this.envir=this.token.getEnv();
        this.userId = this.token.getId();
      }
    )
  }
}
