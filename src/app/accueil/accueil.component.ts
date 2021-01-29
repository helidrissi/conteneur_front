import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UploaderService } from "../services/uploader.service";

import * as $ from 'jquery';
import { AccountService } from '../services/account.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilComponent implements OnInit {
  progress: number;
  infoMessage: any;
  show1:boolean=false;
  show2:boolean=false;
  show3:boolean=false;
  show4:boolean=false;
  show5:boolean=false;

  isUploading: boolean = false;
  file: File;
  
  retrievedImage1: any;
  retrievedImage2: any;
  retrievedImage3: any;
  retrievedImage4: any;
  retrievedImage5: any;
  base64Data: any;
  retrieveResonse: any;
  base64Data1: any;

  imageUrl: string | ArrayBuffer =
    "https://bulma.io/images/placeholders/480x480.png";
  fileName: string = "No file selected";
 

  constructor(private account:AccountService,private token:TokenService,private uploader: UploaderService,private http:HttpClient) { }

  ngOnInit() {
    this.uploader.progressSource.subscribe(progress => {
      this.progress = progress;
    });

    this.getImage1();
    this.getImage2();
    this.getImage3();
    this.getImage4();
    this.getImage5();
    this.account.authStatus.subscribe(
      res=>{
        this.userInfos = this.token.getInfos();
        this.envir=this.token.getEnv();
      }
    )
    
    if( this.userInfos.admin == true) {
      $('.card').toggleClass('active')
    }

    if( localStorage.tablSize ){
      let tablCard = [$( "#card0" ),$( "#card1" ),$( "#card2" ),$( "#card3" ),$( "#card4" )]
      let tablSize = [];
      tablSize = (localStorage.tablSize).split(',')

      for (let i = 0; i <= (tablSize.length/2); i++) {
        let hLoad = tablSize[0]
        let wLoad = tablSize[1] 
        let cardLoad = tablCard[0]
        
        cardLoad.width(wLoad)
        cardLoad.height(hLoad)

        tablSize.shift();
        tablSize.shift();
        tablCard.shift();
      }
    }
  }

  Show1(){

    this.show1=!this.show1

  }
  Show2(){

    this.show2=!this.show2

  }
  Show3(){

    this.show3=!this.show3

  }
  Show4(){

    this.show4=!this.show4

  }
  Show5(){

    this.show5=!this.show5

  }

  getImage1() {
   
  this.http.get('http://localhost:9000/image/get/1')
      .subscribe(

        res => {

          this.retrieveResonse = res;

          this.base64Data = this.retrieveResonse.picByte;

          this.retrievedImage1 =  'data:image/jpeg;base64,' + this.base64Data;
         

        }

      );
  }


  onChange1(file: File) {
    if (file) {
      this.fileName = file.name;
      this.file = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);
     
      reader.onload = event => {
        
        this.retrievedImage1 = reader.result;
       
      };
    }
  }

  onUpload1() {
    this.infoMessage = null;
    this.progress = 0;
    this.isUploading = true;


    this.uploader.upload1(this.file).subscribe(message => {
      this.isUploading = false;
      this.infoMessage = message;
     
    });
  }

  getImage2() {
   
    this.http.get('http://localhost:9000/image/get/2')
        .subscribe(
  
          res => {
  
            this.retrieveResonse = res;
  
            this.base64Data = this.retrieveResonse.picByte;
  
            this.retrievedImage2 =  'data:image/jpeg;base64,' + this.base64Data;
           
  
          }
  
        );
    }
  
  
    onChange2(file: File) {
      if (file) {
        this.fileName = file.name;
        this.file = file;
  
        const reader = new FileReader();
        reader.readAsDataURL(file);
  
        reader.onload = event => {
          this.retrievedImage2 = reader.result;
        };
      }
    }
  
    onUpload2() {
      this.infoMessage = null;
      this.progress = 0;
      this.isUploading = true;
  
  
      this.uploader.upload2(this.file).subscribe(message => {
        this.isUploading = false;
        this.infoMessage = message;
      });
    }
    getImage3() {
   
      this.http.get('http://localhost:9000/image/get/3')
          .subscribe(
    
            res => {
    
              this.retrieveResonse = res;
    
              this.base64Data = this.retrieveResonse.picByte;
    
              this.retrievedImage3 =  'data:image/jpeg;base64,' + this.base64Data;
             
    
            }
    
          );
      }
    
    
      onChange3(file: File) {
        if (file) {
          this.fileName = file.name;
          this.file = file;
    
          const reader = new FileReader();
          reader.readAsDataURL(file);
    
          reader.onload = event => {
            this.retrievedImage3 = reader.result;
          };
        }
      }
    
      onUpload3() {
        this.infoMessage = null;
        this.progress = 0;
        this.isUploading = true;
    
    
        this.uploader.upload3(this.file).subscribe(message => {
          this.isUploading = false;
          this.infoMessage = message;
        });
      }


      getImage4() {
   
        this.http.get('http://localhost:9000/image/get/4')
            .subscribe(
      
              res => {
      
                this.retrieveResonse = res;
      
                this.base64Data = this.retrieveResonse.picByte;
      
                this.retrievedImage4 =  'data:image/jpeg;base64,' + this.base64Data;
               
      
              }
      
            );
        }
      
      
        onChange4(file: File) {
          if (file) {
            this.fileName = file.name;
            this.file = file;
      
            const reader = new FileReader();
            reader.readAsDataURL(file);
      
            reader.onload = event => {
              this.retrievedImage4 = reader.result;
            };
          }
        }
      
        onUpload4() {
          this.infoMessage = null;
          this.progress = 0;
          this.isUploading = true;
      
      
          this.uploader.upload4(this.file).subscribe(message => {
            this.isUploading = false;
            this.infoMessage = message;
          });
        }

        getImage5() {
   
          this.http.get('http://localhost:9000/image/get/5')
              .subscribe(
        
                res => {
        
                  this.retrieveResonse = res;
        
                  this.base64Data = this.retrieveResonse.picByte;
        
                  this.retrievedImage5 =  'data:image/jpeg;base64,' + this.base64Data;
                 
        
                }
        
              );
          }
        
        
          onChange5(file: File) {
            if (file) {
              this.fileName = file.name;
              this.file = file;
        
              const reader = new FileReader();
              reader.readAsDataURL(file);
        
              reader.onload = event => {
                this.retrievedImage5 = reader.result;
              };
            }
          }
        
          onUpload5() {
            this.infoMessage = null;
            this.progress = 0;
            this.isUploading = true;
        
        
            this.uploader.upload5(this.file).subscribe(message => {
              this.isUploading = false;
              this.infoMessage = message;
            });
          }

  userInfos:any;

  envir:any;


  saveBtn(){
    let tablCard = [$( "#card0" ),$( "#card1" ),$( "#card2" ),$( "#card3" ),$( "#card4" )]
    let tablSize = []

    for (let i = 0; i < tablCard.length; i++) {
      let hSave = tablCard[i].height();
      let wSave = tablCard[i].width();

      tablSize.push(hSave)
      tablSize.push(wSave)
    }
    localStorage.tablSize = tablSize
  }

  deployer(id, idPlus, idMoins){
    document.getElementById(id).style.display = 'block'

    document.getElementById(idPlus).style.visibility = 'hidden'
    document.getElementById(idMoins).style.visibility = 'visible'
  }

  cacher(id, idPlus, idMoins){
    document.getElementById(id).style.display = ''
    
    document.getElementById(idPlus).style.visibility = 'visible'
    document.getElementById(idMoins).style.visibility = 'hidden'
  }

  zoomCarousel(){
    $('.carousel-inner').toggleClass('active')
    $('.carousel-caption').toggleClass('active')
  }
  
}
