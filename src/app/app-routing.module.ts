import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BoardsComponent } from './boards/boards.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    children: [
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
      },
      {
        path: 'login', // child route path
        component: LoginComponent, // child route component that the router renders
        pathMatch: 'full'
      },
      {
        path: 'signup',
        component: SignupComponent, // another child route component that the router renders
        pathMatch: 'full'
      },
      {
        path: 'boards',
        component: BoardsComponent, // another child route component that the router renders
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent, // another child route component that the router renders
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
