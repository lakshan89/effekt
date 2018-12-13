import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isValid: boolean = true;

  constructor(
    private _user: UsersService,
    private _router : Router
  ) { }

  loginForm = new FormGroup({
    username : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', Validators.required)
  });

  ngOnInit() {
  } 

  onSubmit() {
      if(this.loginForm.valid) {
          this.isValid = true;
          // technically this validation should be done by the backend. however Im doing it here for demo.
          this._user.getAllUsers().subscribe(r=>{
            if(this._user.isValidUser(r, this.loginForm.value)){
                this._router.navigate(['dashboard']);
            }else{
              this.isValid = false;
            }
          })
      }
  }

  

}
