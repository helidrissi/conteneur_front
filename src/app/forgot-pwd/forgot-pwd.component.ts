import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { ResetService } from '../services/reset.service';

@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.css']
})
export class ForgotPwdComponent implements OnInit {

  succesMessage:String;
  errorMessage:string;
 
  test:any;
  isMatch:Boolean
  formForgot=new FormGroup({
  
    password:new FormControl('',[Validators.required,Validators.minLength(6)]),
    confirmPassword:new FormControl('',[Validators.required,Validators.minLength(6)]),
    token:new FormControl(''),
    

  })


  constructor(private reset:ResetService,private router:Router,private account:AccountService,private http:HttpClient,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    
    this.activatedRoute.queryParams.subscribe(params => {
      this.test = params['token'];
      
  });

  }
  forgotPwd(): void {

    this.succesMessage='';
    this.errorMessage='';
    // if(this.formLogin.get('password')!=this.formLogin.get('confirmPassword')) {
    //   this.errorMessage = "Les deux mot de passes ne sont pas identiques";
    // }
    console.log(this.formForgot)
    this.reset.forgotPwd2(this.formForgot.value).
    subscribe( data => {
      this.router.navigate(['/login']);
      }, error => {
        if(error.status === 500 ) {
          this.errorMessage = "Token Expirée";
        }
        else if(error.status === 200) {
          this.succesMessage = "votre mot de passe a été modifié avec succès";
        }
        else if(error.status === 416  )
        {
          this.errorMessage= "Les deux mot de passes ne sont pas identiques"
        }
        else{
          this.errorMessage = "Une erreur est survenue";
        }
      });
       
        
       

  };


}
