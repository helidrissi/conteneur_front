import { TokenService } from './../services/token.service';
import { AccountService } from './../services/account.service';
import { UsersService } from './../services/users.service';
import { Users } from './../models/users';
import { Component, OnInit, ViewChild ,ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiError } from '../models/ApiError';

@Component({
  selector: 'app-users-bis',
  templateUrl: './users-bis.component.html',
  styleUrls: ['./users-bis.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class UsersBisComponent implements OnInit {

 
  selectedElement: Users;
  formSuccessMsg = false;
  formErrorMsg: string;
  displayedColumns = ['firstName', 'lastName', 'email'];
  dataSource: MatTableDataSource<Users>;
  users: Users[];
  loaded: boolean;
  pageUrl = '/users-bis';
  fieldTextType: boolean;
  envir: any;
  userInfos: any;



  @ViewChild(MatPaginator) 
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }
  @ViewChild(MatSort) sort: MatSort;


  formGroup = new FormGroup({
    
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
   


  

  });

  constructor( private changeDetectorRefs: ChangeDetectorRef ,
               private service:UsersService,private router: Router,
               private account:AccountService,private token:TokenService
    ) {
    // Create 100 users
    
    this.service.getUsers().subscribe(response => {
      console.log('test load elements')
      this.users = response;
      this.dataSource = new MatTableDataSource(this.users);})
    // Assign the data to the data source for the table to render
    
    
   
  }
  ngOnInit(): void {
    
    this.account.authStatus.subscribe(res => {
      this.envir = this.token.getEnv();
      this.userInfos = this.token.getInfos();
    }
  );
   
  }
  initTable(){ }
  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {

    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  

  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  create(): void {
    this.resetFormElements();
  }
  save(): void {
    console.log('save');
     if (this.selectedElement) {
      this.update();
    } else {
  console.log(this.formGroup.value);
      this.service.AddUser(this.formGroup.value)
        .subscribe(data => {
          this.router.navigate([this.pageUrl]);
          this.resetFormElements();
           this.formSuccessMsg = true;
          this.initTable();
         }, (error: ApiError) => {
           this.resetFormMessages();
           // this.formErrorMsg = error.message;
           console.log(error.message);
           this.formErrorMsg = (error.status === 400) ? 'Élément déjà existant' : 'Une erreur serveur est survenue';
         });
     }
   }
   update(): void {
    console.log('update');
   this.service.patchUser(this.selectedElement.id, this.formGroup.value)
      .subscribe(data => {
        this.router.navigate([this.pageUrl]);
        this.resetFormElements();
         this.formSuccessMsg = true;
        this.initTable();
      }, (error: ApiError) => {
        this.resetFormMessages();
       this.formErrorMsg = error.message;
      console.log(error.message);
         this.formErrorMsg = (error.status === 400) ? `Impossible d'appliquer cette modification`  : 'Une erreur serveur est survenue';
      });
   }

  resetFormElements(): void {
    this.formGroup.reset();
    this.formGroup.get('password').setValidators([Validators.required, Validators.minLength(6)]);
    this.selectedElement = null;
    this.resetFormMessages();
  }

  resetFormMessages(): void {
    this.formSuccessMsg = false;
    this.formErrorMsg = null;
  }

  didSelectRow(element: Users): void {
    this.resetFormMessages();
   this.selectedElement = element;
   this.formGroup.patchValue(
     {
       firstName: element.firstName,
       lastName: element.lastName,
       email: element.email,
 //       categorie: this.getFonctionWithId(element.fonction),
 //       ordreAffichage: element.ordreAffichage,
       
 //    
     }
   );
    this.formGroup.get('password').clearValidators();
    this.formGroup.get('password').updateValueAndValidity();
  }

  toggleFieldTextType(): void{
    this.fieldTextType = !this.fieldTextType;
  }
}

/** Builds and returns a new User. */




