import { BrowserModule } from '@angular/platform-browser';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http'

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './partials/page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';


import {JwtInterceptor} from './services/jwt.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SidebarComponent } from './sidebar/sidebar.component';

import { MenuComponent } from './menu/menu.component';
import { SafePipe } from './safe.pipe';

import { AccueilComponent } from './accueil/Accueil.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AdministrationComponent } from './administration/administration.component';
import { FilterPipe } from './filter.pipe';
import { TestComponent } from './test/test.component';

import { ResetPwdComponent } from './reset-pwd/reset-pwd.component';
import { ForgotPwdComponent } from './forgot-pwd/forgot-pwd.component';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { UsersComponent } from './users/users.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';

import {MatCardModule} from '@angular/material/card';




import { UsersBisComponent } from './users-bis/users-bis.component';






import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import { A11yModule } from '@angular/cdk/a11y';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkTreeModule } from '@angular/cdk/tree';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';

//import {FlexLayoutModule} from '@angular/flex-layout';
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    LoginComponent,
    SidebarComponent,
    MenuComponent,
    SafePipe,
    AccueilComponent,
    AdministrationComponent,
    FilterPipe,
    TestComponent,
    ResetPwdComponent,
    ForgotPwdComponent,
    UsersComponent,
    UsersBisComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgScrollbarModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
      
  }),
  // FontAwesomeModule,
  // MatFormFieldModule,
  // MatInputModule,
  // MatTableModule,
  // MatPaginatorModule,
  // MatSortModule,
  // MatCardModule,
  // MatCheckboxModule,
  // MatInputModule,
 
  // NgbModalModule,
  // MatSnackBarModule,
  // MatDialogModule

  FontAwesomeModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule,
  //DragDropModule,
  NgbModalModule,
  MatSnackBarModule,
  MatDialogModule

  ],
  exports: [
    MatFormFieldModule, MatInputModule,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
   // DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
  ],
 
 
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:JwtInterceptor,
    multi:true,
  },
 

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faUpload);
  }
 }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
