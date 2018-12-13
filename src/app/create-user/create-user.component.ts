import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateUserComponent implements OnInit {

  constructor(private _user: UsersService) { }  
  @Input() display: boolean;
  @Output() displayChange: EventEmitter<boolean> = new EventEmitter();

  createUserForm = new FormGroup({
    'firstName' : new FormControl('',Validators.required),
    'lastName' : new FormControl('',Validators.required),
    'username' : new FormControl('',[ Validators.required,Validators.email]),
    'address' : new FormControl('',Validators.required),
    'password' : new FormControl('',Validators.required),
  })

  ngOnInit() {
  }

  onSubmit(){
    if(this.createUserForm.valid){
      this._user.getAllUsers().subscribe(users=> {
        let nextId = users.length +1;
        this._user.createUser(this.createUserForm.value,nextId).subscribe(res=>{         
          if(res.id){ this.onClose(); }
        });
      });      
    }   
  }

  onClose() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
