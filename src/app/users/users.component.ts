import { AgencyService } from './../services/agency.service';
import { CompanyService } from './../services/company.service';
import { UsersService } from './../services/users.service';
import { Users } from './../models/users';

import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

import '@angular/compiler';

import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NavigationEnd, Router} from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator/';
import {MatTableDataSource} from '@angular/material/table';
import {MAT_FORM_FIELD, MatFormField, MatFormFieldControl} from '@angular/material/form-field';

import {ApiError} from '../models/ApiError';

import {MatDialog} from '@angular/material/dialog';
import { AccountService } from '../services/account.service';
import { TokenService } from '../services/token.service';
import { interval, Observable, Subscription } from 'rxjs';
import { Company } from '../models/company';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
 // encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {

  displayedColumns = ['firstName', 'lastName', 'email'];
  dataSource: MatTableDataSource<Users>;
  fieldTextType: boolean;
  loaded: boolean;
  compagnies: any[];
  agencies: any;
  message: any;
  @ViewChild(MatPaginator) 
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }
  @ViewChild(MatSort) sort: MatSort;

  envir: any;
  formSuccessMsg = false;
  formErrorMsg: string;

  pageUrl = '/users';

  selectedElement: Users;

  users: any[];
  fonctions: any[] = [];
  ordreOptions: any[] = [];
  subscription: Subscription;


  formGroup = new FormGroup({
    

    
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
   company: new FormControl('', [Validators.required]),
   agency: new FormControl(''),


  

  });
  userInfos: any;

  constructor(private dialog: MatDialog, private service: UsersService, private router: Router, private account: AccountService, private token: TokenService
    ,  private changeDetectorRefs: ChangeDetectorRef,private serviceCompany:CompanyService,private agency:AgencyService) {

  }
  
  
  ngOnInit(): void {

    this.formGroup.get('company').valueChanges.subscribe(val => {
      this.message = val;
 
        
   this.agency.getCompany(this.message).subscribe(response => {
   
    this.agencies = response;
    
 })
 
    });
    

  
    this.account.authStatus.subscribe(res => {
        this.envir = this.token.getEnv();
        this.userInfos = this.token.getInfos();
      }
    );

    this.serviceCompany.getCompanies().subscribe(response => {
      console.log('test load elements')
      this.compagnies = response;
    })
        

  
  
   
  this.initTable();
   
   }
  

  initTable(): void{
    this.service.getUsers().subscribe(response => {
      console.log('test load elements')
      this.users = response;
      this.dataSource = new MatTableDataSource(this.users);
      
     
      
   },
   (error) => {
    console.log(error);
   }
 );
   }
  ngAfterViewInit(): void {
   this.dataSource.sort = this.sort;
  }

 
  create(): void {
    this.resetFormElements();
  }

  save(): void {
    console.log('save');
     if (this.selectedElement) {
      this.update();
    } else {
  alert(this.formGroup.get('company').value+"hzerjghrgherg");
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

  // delete(): void {
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     data: { message: 'Confirmer la suppression ?', buttonText: {ok: 'Oui', cancel: 'Non'} }
  //   });
  //   dialogRef.afterClosed().subscribe((confirmed: boolean) => {
  //     if (confirmed) {
  //       this.deleteAction();
  //     }
  //   });
  // }
  // deleteAction(): void {
  //   this.service.delete(this.selectedElement)
  //     .subscribe(data => {
  //       this.router.navigate([this.pageUrl]);
  //       this.formSuccessMsg = true;
  //       this.formGroup.reset();
  //       this.formErrorMsg = '';
  //       this.initTable();
  //     }, (error: ApiError) => {
  //       console.log(error);
  //       // this.formErrorMsg = error.message;
  //       console.log(error.message);
  //       this.formErrorMsg = (error.status === 500) ? 'Suppression impossible pour des raisons de dépendance' : 'Une erreur Serveur est survenue';
  //       this.formSuccessMsg = false;
  //     });
  // }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */


  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  toggleFieldTextType(): void{
    this.fieldTextType = !this.fieldTextType;
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


  getFonctionWithId(id: any): any {
     return this.fonctions.find(c => c.id === id);
   }
   getLibFonctionWithId(id: any): any {
     const fonction = this.getFonctionWithId(id);
     return fonction ? fonction.libelle : '';
   }

  compareFn(c1: any, c2: any): boolean {
     return c1 && c2 ? c1.id === c2.id : c1 === c2;
   }

  

}
