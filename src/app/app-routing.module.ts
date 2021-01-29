
import { UsersBisComponent } from './users-bis/users-bis.component';
import { ForgotPwdComponent } from './forgot-pwd/forgot-pwd.component';
import { TestComponent } from './test/test.component';
import { AccueilComponent } from './accueil/Accueil.component';
import { PageNotFoundComponent } from './partials/page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent} from './menu/menu.component'
import { AdministrationComponent } from './administration/administration.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/guards/auth.guard';
import { AfterAuthGuard } from '../app/guards/after-auth.guard'
import { ResetPwdComponent } from './reset-pwd/reset-pwd.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
 
  { path:'menu/:alias',component:MenuComponent,canActivate:[AuthGuard]},
  { path: '',  redirectTo: "/accueil", pathMatch: "full",canActivate:[AuthGuard] },
  { path: 'accueil', component: AccueilComponent ,canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent ,canActivate:[AfterAuthGuard]},
  { path: 'parametre', component: AdministrationComponent ,canActivate:[AuthGuard] },
  { path: 'users', component: UsersComponent ,canActivate:[AuthGuard] },
  { path: 'users-bis', component: UsersBisComponent ,canActivate:[AuthGuard] },
 
  {path: 'reset2', component: ForgotPwdComponent },
  {path: 'reset', component: ResetPwdComponent},
  {path: 'test', component: TestComponent,canActivate:[AuthGuard]},

 
  { path: '**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }