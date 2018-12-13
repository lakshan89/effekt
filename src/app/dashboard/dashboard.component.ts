import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UsersService } from '../users.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  users: any;
  showEmpCreate: Boolean = false;

  constructor(
    private _user : UsersService,
  ) { }

  ngOnInit() {
    this.loadUsers();
    this._user.hasUsersAdded().subscribe(res => this.loadUsers());
  }

  loadUsers(){
    this._user.getAllUsers().subscribe(users=> this.users = users);
  }

  addEmployee(){
    this.showEmpCreate = true;
  }

}
