import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms'
import { UsersService } from './users.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TableModule } from 'primeng/table';
import { CreateUserComponent } from './create-user/create-user.component';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routs: Routes = [
  {
    path: '',
    component: LoginComponent    
  },

  {
    path: 'login',
    component: LoginComponent    
  },

  {
    path: 'dashboard',
    canActivate:  [AuthGuard],
    component: DashboardComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    CreateUserComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routs),
    ReactiveFormsModule,
    HttpClientModule,
    TableModule,
    DialogModule,
    BrowserAnimationsModule
  ],
  providers: [
    UsersService,
    AuthGuard    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
