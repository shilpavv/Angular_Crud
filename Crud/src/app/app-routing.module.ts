import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { LoginComponent } from './login/login.component';
 import { AuthGuard } from './guard/auth.guard';
import { LoggedInAuthGuard } from './guard/loggedIn/loggedin.guard';
const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employee',
    component: EmployeeComponent,
   canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent , canActivate: [LoggedInAuthGuard]},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
