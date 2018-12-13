import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any;

  constructor(
    private _user: UsersService,
    private _router : Router) { }

  ngOnInit() {
    this.user = this._user.getLoggedinUser();
    console.log(this.user);
  }

  logout(){
    localStorage.removeItem('user');
    this._router.navigate(['login']);
  }

}
