import { Agency } from './../models/agency';
import { AgencyService } from './../services/agency.service';
import { CompanyService } from './../services/company.service';
import { UsersService } from './../services/users.service';
import { HttpClient, HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';
import { EnvService } from './../env.service';
import { BehaviorSubject, interval, Observable, Subscription } from 'rxjs';
import { TestService } from './../test.service';
import { MenuComponent } from './../menu/menu.component';
import { UploaderService } from "../services/uploader.service";
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import * as $ from 'jquery';
import { AccountService } from '../services/account.service';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { map, tap, last } from "rxjs/operators";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { data } from 'jquery';
import { DomSanitizer } from '@angular/platform-browser';
import { Users } from '../models/users';
import { Company } from '../models/company';


@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],

})
export class SidebarComponent implements OnInit {
  envir: any
  XX: any;
  lgn = window.localStorage.getItem('lang');
  company:Company;
  agency:Agency;
  selectedFile: File;
  selectedFile1: File;
  retrievedImage: any;
  retrievedImageM: any;
  base64Data: any;
  retrieveResonse: any;
  base64Data1: any;
  retrieveResonse1: any;
  message: string;
  imagePath: any
  imageName: any;
  class: any;
  Users: any[] = [];
 
  currentuser: null;
  userInfos: any = null;
  closeResult: string;
  subscription: Subscription;
  cst: any="00";
  cst1: any="00";
  testt: any;
  env: any;
  progress: number;
  infoMessage: any;
  progress1: number;
  infoMessage1: any;
  show: boolean = false;
  isUploading: boolean = false;
  file: File;
  fileName: string = "No file selected";
  isUploading1: boolean = false;
  file1: File;
  fileName1: string = "No file selected";
  showMsgSuccess: boolean = false;
  messageUpload: string;
  messageS: string;
  messageF: string;
  errorMessage: string;
  User:any;
  Cp:any;

  
  constructor(private http: HttpClient, private account: AccountService, private token: TokenService, private router: Router, private toastr: ToastrService,
    private modalService: NgbModal, private test: TestService, private userservice: UsersService, private httpClient: HttpClient, private _sanitizer: DomSanitizer,
    public translateChild: TranslateService, private uploader: UploaderService,private companyservice:CompanyService,private agencyservice:AgencyService) { }

  searchText = '';
  searchText1 = '';
 



  getImage() {
    this.httpClient.get('http://localhost:9000/image/get/' + this.XX, { headers: { skip: "true" } })
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        });
  }

 
 
  ngOnInit(): void {
    
    
    this.uploader.progressSource.subscribe(progress => {
      this.progress = progress;
    });
    if (this.lgn == 'en') {
      this.lgn = "English"
      this.class = "sl-flag flag-eng"
    }
    else if (this.lgn == 'fr') {
      this.lgn = "Français"
      this.class = "sl-flag flag-fr"
    }
    else {
      this.lgn = "Français"
      this.class = "sl-flag flag-fr"
    }
    $(function () {
      if (window.localStorage.getItem('sideb') == 'close') {
        $('.btn-infoo').animate({}, 0).css({ 'rotate': '-90deg' })
        $('#sticky-footer').toggleClass('open')
      } else {
        $('.btn-infoo').animate({}, 0).css({ 'rotate': '0deg' })
        $('#sticky-footer').toggleClass('')
      }

      $(document).mousemove("mousemove", function (event) {
        if ($('#sidebar').hasClass('')) {
          if ((event.clientX <= 20) && (event.clientY >= 0 && event.clientY <= 945)) {
            $('#sidebar').toggleClass('active');
            $('#sticky-footer').toggleClass('open').css({ 'transition': 'all 0.5s' })
          }
        }
      })

      $(document).mouseleave("mouseleave", function (event) {
        if ($('#sidebar').hasClass('active')) {
          if (event.clientX < 0) {
            $('#sidebar').toggleClass('');
            $('#sticky-footer').toggleClass('')
          }
        }
      })

      var sidebar = window.localStorage.getItem('sideb')
      if (sidebar == 'close') {
        $('#sidebar').toggleClass('active').css({ 'transition': 'all 0.5s' })
        $('#sticky-footer').toggleClass('').css({ 'transition': 'all 0.5s' })
      } else {
        $('#sidebar').toggleClass('')
      }

      $('.btn-infoo').click(function (e) {
        e.preventDefault();
        if ($('#sidebar').hasClass('active')) {
          var etat: string = 'close'
          window.localStorage.setItem('sideb', etat)
        } else {
          etat = 'open'
          window.localStorage.setItem('sideb', etat)
        }
      })
    });

    
    this.account.authStatus.subscribe(
      res => {
        this.currentuser = this.token.getInfos();
        this.userInfos = this.token.getInfos();
        this.envir = this.token.getEnv();
        this.XX = this.token.getId();
        this.Cp=this.token.getCompany();
      }
    )
    

    if(this.currentuser){


      this.httpClient.get('http://localhost:9000/image/get/' + this.userInfos.company, { headers: { skip: "true" } }).subscribe(
        res => {
          this.retrieveResonse1 = res;
          this.base64Data1 = this.retrieveResonse1.picByte;
          this.retrievedImageM = 'data:image/jpeg;base64,' + this.base64Data1;
        });



    this.companyservice.getCompany(this.userInfos.company)
    .subscribe(data => {
      
      this.company = data;
    }, error => console.log(error));


    

    const source = interval(100);

   this.subscription = source.subscribe(val =>  this.companyservice.getCompany(this.userInfos.company)
    .subscribe(data => {
      
      this.company = data;
    }, error => console.log(error)));



    
   
    this.agencyservice.getAgency(this.userInfos.agence)
    .subscribe(data => {
      
      this.agency = data;
    }, error => console.log(error));

  
    

  const source1 = interval(100);

  this.subscription = source1.subscribe(val =>  this.agencyservice.getAgency(this.userInfos.agence)
   .subscribe(data => {
      
      this.agency = data;
    }, error => console.log(error)));
   


   
  }

     
   
    this.getImage();


  }

  // testAcubench() {
  //   this.test.test().then(
  //     (data) => this.cst = data
  //   )}


  
  onChangeAvatar(file: File) {
    if (file) {
      this.fileName = file.name;
      this.file = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = event => {
        this.retrievedImage = reader.result;
      };
    }
  }

  onUploadAvatar() {
    this.infoMessage = null;
    this.progress = 0;
    this.isUploading = true;
    this.errorMessage = '';

    this.upload(this.file).subscribe(message => {
      this.isUploading = false;
      this.infoMessage = message;
    }, error => {
      if (error.status === 200) {
        this.errorMessage = "OK";
      }
      else {
        this.errorMessage = "KO";
      }

    });
  }
  
  getColor1(){
    return this.company.color1;
  }

  getColor2(){
    return this.agency.color2;
  }
  
  /////////////////////////////////////////////////////////////////////////////////

  public progressSource = new BehaviorSubject<number>(0);
  upload(file: File) {
    const uploadUrl = "http://localhost:9000/image/upload"
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', file, this.userInfos.id);

    const req = new HttpRequest(
      "POST",
      uploadUrl,
      uploadImageData,
      {
        reportProgress: true
      }
    );
    return this.http.request(req).pipe(
      map(event => this.getEventMessage(event, file)),
      tap((envelope: any) => this.processProgress(envelope)),
      last()
    );
  }


  // 
  processProgress(envelope: any): void {
    if (typeof envelope === "number") {
      this.progressSource.next(envelope);
    }
  }

  private getEventMessage(event: HttpEvent<any>, file: File) {
    switch (event.type) {
      case HttpEventType.Sent:
        return `Uploading file "${file.name}" of size ${file.size}.`;
      case HttpEventType.UploadProgress:
        return Math.round((100 * event.loaded) / event.total);
      case HttpEventType.Response:
        return `Le fichier "${file.name}" a été complètement téléchargé!`;
      default:
        return `Le fichier "${file.name}" a subit une erreur de type: ${event.type}.`;
    }
  }

  onChangeLogo(file: File) {
    if (file) {
      this.fileName = file.name;
      this.file = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = event => {
        this.retrievedImageM = reader.result;
      };
    }
  }

  onUploadLogo() {
    this.infoMessage = null;
    this.progress = 0;
    this.isUploading = true;


    this.upload1(this.file).subscribe(message => {
      this.isUploading = false;
      this.infoMessage = message;
    });
  }


  /////////////////////////////////////////////////////////////////////////////////


  public progressSource1 = new BehaviorSubject<number>(0);
  upload1(file: File) {
    const uploadUrl = "http://localhost:9000/image/upload"
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', file, this.userInfos.company);

    const req = new HttpRequest(
      "POST",
      uploadUrl,
      uploadImageData,
      {
        reportProgress: true
      }
    );
    return this.http.request(req).pipe(
      map(event => this.getEventMessage(event, file)),
      tap((envelope: any) => this.processProgress(envelope)),
      last()
    );
  }

  processProgress1(envelope: any): void {
    if (typeof envelope === "number") {
      this.progressSource.next(envelope);
    }
  }

  private getEventMessage1(event: HttpEvent<any>, file: File) {
    switch (event.type) {
      case HttpEventType.Sent:
        return `Uploading file "${file.name}" of size ${file.size}.`;
      case HttpEventType.UploadProgress:
        return Math.round((100 * event.loaded) / event.total);
      case HttpEventType.Response:
        return `File "${file.name}" was completely uploaded!`;
      default:
        return `File "${file.name}" surprising upload event: ${event.type}.`;
    }

    
    

  }

  // getEnv() {
  //   this.envservice.getEnv().subscribe(
  //     data => this.env = data
  //   )
  // }

  //emit value in sequence every 10 second

  // testAcubench() {
  //   this.test.test().then(
  //     (data) => this.cst = data
  //   );

  // }

 

  openSidebar() {
    $('#sidebar').toggleClass('active').css({ 'transition': 'all 0.5s' });
    $('#sticky-footer').toggleClass('open').css({ 'transition': 'all 0.5s' });
    if ($('#sidebar').hasClass('active')) {
      $('.btn-infoo').animate({}, 0).css({ 'rotate': '-90deg' })
    } else {
      $('.btn-infoo').animate({}, 0).css({ 'rotate': '0deg' })
    }
  }

  // doAsyncTask().then(
  //   () => console.log("Task Complete!"),
  //   () => console.log("Task Errored!"),
  // );

  logout() {
    window.localStorage.removeItem('sideb');
    this.token.remove();
    this.account.changeStatus(false);
    let lang = window.localStorage.getItem('lang');
    if (lang == 'en') {
      this.toastr.info(
        `Logout`,
        'You are disconnected!',
        {
          timeOut: 3000,
          positionClass: 'toast-bottom-left',
        }
      )
    } else {
      this.toastr.info(
        `Déconnexion`,
        'Vous êtes déconnecté !',
        {
          timeOut: 3000,
          positionClass: 'toast-bottom-left',
        }
      )
    };
    this.router.navigateByUrl("/login");
  }
  
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openImageTheme(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onNavigate() {
    // your logic here.... like set the url 
    const url = 'http://192.63.63.189:9890/outil-traduction/login';
    window.open(url, '_blank');
  }

  changeLanguage(language: string) {
    if (language == 'fr') {
      this.translateChild.use(language)
      localStorage.setItem('lang', language)

      this.lgn = "Français"
      this.class = "sl-flag flag-fr"
    } else if (language == 'en') {
      this.translateChild.use(language)
      localStorage.setItem('lang', language)

      this.lgn = "English"
      this.class = "sl-flag flag-eng"
    } else {
      this.translateChild.use(language)
      localStorage.setItem('lang', language)

      this.lgn = "Français"
      this.class = "sl-flag flag-fr"
    }

  }

}
